import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';
import { DisplayFunctionsService } from '../../shared/display-functions/display-functions.service';


@Component({
  selector: 'app-vehicle-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  vehicleForm: FormGroup;
  dismantlingOrdersForm: FormGroup;
  @Input() vehicle;
  @Input() types;
  @Input() titles;
  @Input() dismantlingOrdersInput;

  filteredVTypesRx: Observable<any[]>;
  filteredUseCharactersRx: Observable<any[]>;
  filteredBrandsRx: Observable<any[]>;

  mofcomRegistryTypeChange_: Subscription;
  isPersonChange_: Subscription;

  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private df: DisplayFunctionsService) { }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      id: {value: this.vehicle.id, disabled: true},
      mofcomRegistryType: [this.vehicle.mofcomRegistryType, [
        this.sv.notListedInObjList(this.types.mofcomRegistryTypes)
      ]],
      entranceDate: [this.vehicle.entranceDate],
      metadata: this.fb.group({
        isDeleted: [this.vehicle.metadata.isDeleted],
        deletedFor: [this.vehicle.metadata.deletedFor],
      }),
      vehicle: this.fb.group({
        plateNo: [this.vehicle.vehicle.plateNo, [Validators.required, Validators.pattern(/^.{7,7}$/)]],
        vehicleType: [this.vehicle.vehicle.vehicleType, [
          this.sv.notListedInObjList(this.types.vehicleTypes)
        ]],
        useCharacter: [this.vehicle.vehicle.useCharacter, [
          this.sv.notListedInObjList(this.types.useCharacters)
        ]],
        brand: [this.vehicle.vehicle.brand],
        model: [this.vehicle.vehicle.model],
        engineNo: [this.vehicle.vehicle.engineNo],
        registrationDate: [this.vehicle.vehicle.registrationDate],
        totalMassKG: [this.vehicle.vehicle.totalMassKG, Validators.pattern(/^[0-9]+$/)],
        lengthOverallMM: [this.vehicle.vehicle.lengthOverallMM, Validators.pattern(/^[0-9]+$/)],
        color: [this.vehicle.vehicle.color],
        aquisitionType: [this.vehicle.vehicle.aquisitionType, [
          this.sv.notListedInObjList(this.types.aquisitionTypes)
        ]],
        aquisitionDetail: [
          this.vehicle.vehicle.aquisitionType.name === '其他' && this.vehicle.vehicle.aquisitionDetail ?
             this.vehicle.vehicle.aquisitionDetail : ''
        ],
        displacementL: [this.vehicle.vehicle.displacementL, Validators.pattern(/^[0-9]{1,2}\.?[0-9]?$/)],
        fuelType: [this.vehicle.vehicle.fuelType, [
          this.sv.notListedInObjList(this.types.fuelTypes)
        ]],
        seats: [this.vehicle.vehicle.seats, Validators.pattern(/^[0-9]{1,2}$/)],
        isNEV: [this.vehicle.vehicle.isNEV ? true : false, [this.sv.isBoolean()]],
      }),
      owner: this.fb.group({
        name: [this.vehicle.owner.name, Validators.required],
        address: [this.vehicle.owner.address],
        zipCode: [this.vehicle.owner.zipCode, Validators.pattern(/^[0-9]{6,6}$/)],
        idType: [this.vehicle.owner.idType], // setValidator here after setting isPerson
        idNo: [this.vehicle.owner.idNo],
        tel: [this.vehicle.owner.tel, Validators.pattern(/^[0-9]{7,11}$/)],
        isPerson: [this.vehicle.owner.isPerson],
        isRemote: [this.vehicle.owner.isRemote]
      }),
      agent: this.fb.group({
        name: [this.vehicle.agent.name],
        idType: [this.vehicle.owner.idType],
        idNo: [this.vehicle.agent.idNo],
        tel: [this.vehicle.agent.tel, Validators.pattern(/^[0-9]{7,11}$/)],
      }),
      docsProvided: this.fb.group({
        vRegistrationCert: [this.vehicle.docsProvided.vRegistrationCert ? this.vehicle.docsProvided.vRegistrationCert : false],
        vLicenseA: [this.vehicle.docsProvided.vLicenseA],
        vLicenseB: [this.vehicle.docsProvided.vLicenseB],
        plateCount: [this.vehicle.docsProvided.plateCount, Validators.pattern(/^[0-2]$/)]
      }),
    });

    this.dismantlingOrdersForm = this.fb.group({
      dismantlingOrders: this.fb.array(this.dismantlingOrdersInput.map(dOrder => this.fb.group({
        id: {value: dOrder.id, disabled: true},
        vin: [dOrder.vin],
        orderType: [{value: dOrder.orderType, disabled: true}, this.sv.notListedInObjList(this.types.dismantlingOrderTypes)],
        orderDate: [{value: dOrder.orderDate, disabled: true}],
        estimatedFinishDate: [{
          value: dOrder.estimatedFinishDate,
          disabled: dOrder.estimatedFinishDate ? true : false
        }],
        actualFinishDate: [{
          value: dOrder.actualFinishDate,
          disabled: dOrder.actualFinishDate ? true : false
        }]
      })))
    });



    this.filteredVTypesRx = this.valueChangesToFilteredObjListRx(
      this.vehicleForm, 'vehicle.vehicleType', this.types.vehicleTypes, this.filterObjListFac(this.sortObjListByName)
    );

    this.filteredUseCharactersRx = this.valueChangesToFilteredObjListRx(
      this.vehicleForm, 'vehicle.useCharacter', this.types.useCharacters, this.filterObjListFac(this.sortObjListByName)
    );

    this.filteredBrandsRx = this.valueChangesToFilteredObjListRx(
      this.vehicleForm, 'vehicle.brand', this.types.brands, this.filterObjListFac(this.sortObjListByName, true)
    );

    /*
      change ... on mofcomRegistryType changes
    */
    this.mofcomRegistryTypeChange_ = this.vehicleForm.get('mofcomRegistryType').valueChanges
      .subscribe(value => {
        switch (value.name) {
          // change isRemote on mofcomRegistryTypeChange
          case '异地':
            this.vehicleForm.get('owner.isRemote').setValue(true);
            break;
          default:
            this.vehicleForm.get('owner.isRemote').setValue(false);
        }
      });

    this.isPersonChange_ = this.vehicleForm.get('owner.isPerson').valueChanges
      .subscribe(value => {
        this.vehicleForm.get('owner.idType').setValue({});
      });
  }


  // -------- start of dismantlingOrders related methods --------
  get dismantlingOrders(): FormArray  {
    return this.dismantlingOrdersForm.get('dismantlingOrders') as FormArray;
  }

  addDismantlingOrder() {
    this.dismantlingOrders.push(this.fb.group({
      id: {value: '待定', disabled: true},
      vin: [this.vehicle.vin],
      orderType: ['', this.sv.notListedInObjList(this.types.dismantlingOrderTypes)],
      orderDate: [(new Date()).toISOString().slice(0, 10)],
      estimatedFinishDate: [''],
      actualFinishDate: ['']
    }));
  }

  // -------- end of dismantlingOrders related methods --------

  ngOnDestroy() {
    this.mofcomRegistryTypeChange_.unsubscribe();
  }

  valueChangesToFilteredObjListRx(fg: FormGroup, ctrlPath: string, objList: {[key: string]: any}[], filterFn) {
    return fg.get(ctrlPath).valueChanges
      .startWith(null)
      .map(value => filterFn(objList, value));
  }


  filterObjList(objList: {[key: string]: any}[], value: any): any[] {
    const list = objList.map(obj => obj.name);
    return value ? list.filter(item => new RegExp(`^${value}`, 'gi').test(item)) : list;
  }

  filterObjListFac(sortFn, hideInitList?: Boolean) {
    return (objList: {name: string}[], value: any): any[] => {
      const sortedObjList = sortFn(objList);
      if (hideInitList) {
        return value ? sortedObjList.filter(item => new RegExp(`^${value}`, 'gi').test(item.name)) : [];
      } else {
        return value ? sortedObjList.filter(item => new RegExp(`^${value}`, 'gi').test(item.name)) : sortedObjList;
      }
    }
  }

  sortObjListByName(objList: {name: string}[]) {
    return objList.sort((a, b) => a.name.localeCompare(b.name));
  }

}
