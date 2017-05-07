import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-vehicle-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  vehicleForm: FormGroup;
  @Input() vehicle;
  @Input() types;
  @Input() titles;

  filteredVTypesRx: Observable<any[]>;
  filteredUseCharactersRx: Observable<any[]>;
  filteredBrandsRx: Observable<any[]>;

  mofcomRegistryTypeChange_: Subscription;
  isPersonChange_: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      id: {value: this.vehicle.id, disabled: true},
      isDeleted: [this.vehicle.isDeleted],
      deletedFor: [this.vehicle.deletedFor],
      mofcomRegistryType: [this.vehicle.mofcomRegistryType, [
        this.validatorNotListedInObjList(this.types.mofcomRegistryTypes)
      ]],
      entranceDate: [this.vehicle.entranceDate],
      vehicle: this.fb.group({
        plateNo: [this.vehicle.vehicle.plateNo, [Validators.required, Validators.pattern(/^.{7,7}$/)]],
        vehicleType: [this.vehicle.vehicle.vehicleType, [
          this.validatorNotListedInObjList(this.types.vehicleTypes)
        ]],
        useCharacter: [this.vehicle.vehicle.useCharacter, [
          this.validatorNotListedInObjList(this.types.useCharacters)
        ]],
        useCharacterName: [this.vehicle.vehicle.useCharacter.name, [
          this.notListedValidator(this.types.useCharacters.map(obj => obj.name))
        ]],
        brand: [this.vehicle.vehicle.brand],
        model: [this.vehicle.vehicle.model],
        engineNo: [this.vehicle.vehicle.engineNo],
        registrationDate: [this.vehicle.vehicle.registrationDate],
        totalMassKG: [this.vehicle.vehicle.totalMassKG, Validators.pattern(/^[0-9]+$/)],
        lengthOverallMM: [this.vehicle.vehicle.lengthOverallMM, Validators.pattern(/^[0-9]+$/)],
        color: [this.vehicle.vehicle.color],
        aquisitionType: [this.vehicle.vehicle.aquisitionType, [
          this.validatorNotListedInObjList(this.types.aquisitionTypes)
        ]],
        aquisitionDetail: [
          this.vehicle.vehicle.aquisitionType.name === '其他' && this.vehicle.vehicle.aquisitionDetail ?
             this.vehicle.vehicle.aquisitionDetail : ''
        ],
        displacementL: [this.vehicle.vehicle.displacementL, Validators.pattern(/^[0-9]{1,2}\.?[0-9]?$/)],
        fuelType: [this.vehicle.vehicle.fuelType, [
          this.validatorNotListedInObjList(this.types.fuelTypes)
        ]],
        seats: [this.vehicle.vehicle.seats, Validators.pattern(/^[0-9]{1,2}$/)],
        isNEV: [this.vehicle.vehicle.isNEV ? true : false, [this.validatorIsBoolean()]],
      }),
      owner: this.fb.group({
        name: [this.vehicle.owner.name, Validators.required],
        address: [this.vehicle.owner.address],
        zipCode: [this.vehicle.owner.zipCode, Validators.pattern(/^[0-9]{6,6}$/)],
        idType: [this.vehicle.owner.idType],
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
      })
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

  notListedValidator(list: any[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      const notListed = list.indexOf(value) === -1;
      return notListed ? {'notListed': {value}} : null;
    };
  }

  validatorNotListedInObjList(objList: {[key: string]: any}[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      let notListed = true;
      for (let i = 0; i < objList.length; i++) {
        if (this.isEquivalent(objList[i], value)) {
          notListed = false;
          break;
        }
      }
      return notListed ? {'notListed': {value}} : null;
    };
  }

  validatorIsBoolean(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      const isBoolean = typeof value === 'boolean';
      return isBoolean ? null : {'notBooleanValue': {value}};
    }
  }

  isEquivalent(a, b) {
      // Create arrays of property names
      const aProps = Object.getOwnPropertyNames(a);
      const bProps = Object.getOwnPropertyNames(b);

      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length != bProps.length) {
          return false;
      }

      for (let i = 0; i < aProps.length; i++) {
          const propName = aProps[i];

          // If values of same property are not equal,
          // objects are not equivalent
          if (a[propName] !== b[propName]) {
              return false;
          }
      }

      // If we made it this far, objects
      // are considered equivalent
      return true;
  }


  displayFnBoolean(ctrlValue) {
    return ctrlValue ? '是' : '否';
  }

  displayFnObj(ctrlValue) {
    return ctrlValue.name;
  }

}
