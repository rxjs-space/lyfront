import { Component, EventEmitter, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';
import { DisplayFunctionsService } from '../../shared/display-functions/display-functions.service';


@Component({
  selector: 'app-show-vehicle-details',
  templateUrl: './show-vehicle-details.component.html',
  styleUrls: ['./show-vehicle-details.component.scss']
})
export class ShowVehicleDetailsComponent implements OnInit, OnDestroy {
  vehicleForm: FormGroup;
  // dismantlingOrdersForm: FormGroup;
  @Input() vehicle;
  @Input() types;
  @Input() titles;
  // @Input() dismantlingOrdersInput;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() methods: any;
  rvAfterFD: number; // residual value after fees and deductions
  filteredVTypesRx: Observable<any[]>;
  filteredUseCharactersRx: Observable<any[]>;
  filteredBrandsRx: Observable<any[]>;

  subscriptions: Subscription[] = [];


  formArrayMethods(formArrayPath) {
    const self = this;
    return {
      delete: (index: number) => {
        (self.vehicleForm.get(formArrayPath) as FormArray).removeAt(index);
      },
      new: (newFDForm: FormGroup) => {
        (self.vehicleForm.get(formArrayPath) as FormArray).push(newFDForm);
      }
    }
  };

  onBrandBlur(event) {
    const brandName = event.target.value;
    if (brandName && !this.types.brands.find(b => b.name === brandName)) {
      return this.createBrandIfNone(brandName)
        .catch(error => Observable.of({ok: false, error}))
        .subscribe(result => {
          if (result.error) {
            console.log(result.error)
            return;
          } else {
            this.types.brands = result.brands;
          }
        });
    }
  }

  createBrandIfNone(brandName: string) {
    const newBrands = this.types.brands.slice().concat([{
      id: this.types.brands.length + 1,
      name: brandName
    }]);
    return this.methods.updateBrands(newBrands);
  }

  prepareSubmit(vehicleForm: FormGroup) {
    const vehicleToSubmit = JSON.parse(JSON.stringify(this.vehicleForm.getRawValue()));
    vehicleToSubmit.mofcomRegisterType = this.types.mofcomRegisterTypes.find(t => t.name === vehicleToSubmit.mofcomRegisterType);
    vehicleToSubmit.vehicle.vehicleType = this.types.vehicleTypes.find(t => t.name === vehicleToSubmit.vehicle.vehicleType);
    vehicleToSubmit.vehicle.useCharacter = this.types.useCharacters.find(t => t.name === vehicleToSubmit.vehicle.useCharacter);
    vehicleToSubmit.vehicle.aquisitionType = this.types.aquisitionTypes.find(t => t.name === vehicleToSubmit.vehicle.aquisitionType);
    vehicleToSubmit.vehicle.fuelType = this.types.fuelTypes.find(t => t.name === vehicleToSubmit.vehicle.fuelType);
    vehicleToSubmit.agent.idType = this.types.pIdTypes.find(t => t.name === vehicleToSubmit.agent.idType);
    vehicleToSubmit.feesAndDeductions.forEach(fd => {
      fd.type = this.types.feesAndDeductionsTypes.find(
        t => t.name === fd.type);
    });
    vehicleToSubmit.owner.idType = this.types.pIdTypes.concat(this.types.oIdTypes).
      find(t => t.name === vehicleToSubmit.owner.idType);
    vehicleToSubmit.vehicle.brand = this.types.brands.find(t => t.name === vehicleToSubmit.vehicle.brand);


    /*
    vehicleForm.vehicle.brand (create new if not listed)
    */

    /*
    mofcomRegisterType
    vehicleForm.vehicle.vehicleType
    vehicleForm.vehicle.useCharacter
    vehicleForm.vehicle.brand (create new if not listed)
    vehicleForm.vehicle.aquisitionType
    vehicleForm.vehicle.fuelType
    owner.idType
    agent.idType
    feesAndDeductions.item.type
    */
  }



  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    public df: DisplayFunctionsService) { }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      id: [{value: this.vehicle.id, disabled: true}],
      batchId: [this.vehicle.batchId],
      isToDeregister: [this.vehicle.isToDeregister],
      mofcomRegisterType: [this.vehicle.mofcomRegisterType.name, [
        this.sv.notListed(this.types.mofcomRegisterTypes.map(type => type.name))
      ]],
      mofcomRegisterRef: [this.vehicle.mofcomRegisterRef],
      entranceDate: [this.vehicle.entranceDate],
      metadata: this.fb.group({
        isDeleted: [this.vehicle.metadata.isDeleted],
        deletedFor: [this.vehicle.metadata.deletedFor],
        deletedBy: [this.vehicle.metadata.deletedBy],
        deletedAt: [this.vehicle.metadata.deletedAt],
        createdAt: [this.vehicle.metadata.createdAt],
        createdBy: [this.vehicle.metadata.createdBy],
      }),
      status: this.fb.group({
        ownerDocsReady: this.fb.group({
          done: [this.vehicle.status.ownerDocsReady.done],
          date: [this.vehicle.status.ownerDocsReady.date]
        }),
        platesCollectedByOwner: this.fb.group({
          done: [this.vehicle.status.platesCollectedByOwner.done],
          date: [this.vehicle.status.platesCollectedByOwner.date]
        }),
        rubbing: this.fb.group({
          done: [this.vehicle.status.rubbing.done],
          date: [this.vehicle.status.rubbing.date]
        }),
        photosOnEntrance: this.fb.group({
          done: [this.vehicle.status.photosOnEntrance.done],
          date: [this.vehicle.status.photosOnEntrance.date]
        }),
        photosAfterCuttingUp: this.fb.group({
          done: [this.vehicle.status.photosAfterCuttingUp.done],
          date: [this.vehicle.status.photosAfterCuttingUp.date]
        }),
        policeSiteEntry: this.fb.group({
          done: [this.vehicle.status.policeSiteEntry.done],
          date: [this.vehicle.status.policeSiteEntry.date]
        }),
        mofcomEntry: this.fb.group({
          done: [this.vehicle.status.mofcomEntry.done],
          date: [this.vehicle.status.mofcomEntry.date],
          ref: [this.vehicle.status.mofcomEntry.ref]
        }),
        mofcomCertReady: this.fb.group({
          done: [this.vehicle.status.mofcomCertReady.done],
          date: [this.vehicle.status.mofcomCertReady.date],
        }),
        mofcomCertCollectedByOwnerAndSigned: this.fb.group({
          done: [this.vehicle.status.mofcomCertCollectedByOwnerAndSigned.done],
          date: [this.vehicle.status.mofcomCertCollectedByOwnerAndSigned.date],
        }),
        firstSurvey: this.fb.group({
          done: [{value: this.vehicle.status.firstSurvey.done, disabled: true}],
          date: [this.vehicle.status.firstSurvey.date],
        }),
        secondSurvey: this.fb.group({
          done: [{value: this.vehicle.status.secondSurvey.done, disabled: true}],
          date: [this.vehicle.status.secondSurvey.date],
        }),
        dismantled: this.fb.group({
          done: [{value: this.vehicle.status.dismantled.done, disabled: true}],
          date: [this.vehicle.status.dismantled.date],
        }),
        remarks: this.fb.array([]),
      }),
      vehicle: this.fb.group({
        plateNo: [this.vehicle.vehicle.plateNo, [Validators.required, Validators.pattern(/^.{7,7}$/)]],
        vehicleType: [this.vehicle.vehicle.vehicleType.name, [
          this.sv.notListed(this.types.vehicleTypes.map(type => type.name))
        ]],
        useCharacter: [this.vehicle.vehicle.useCharacter.name, [
          this.sv.notListed(this.types.useCharacters.map(type => type.name))
        ]],
        brand: [this.vehicle.vehicle.brand.name],
        model: [this.vehicle.vehicle.model],
        conditionOnEntrance: [this.vehicle.vehicle.conditionOnEntrance],
        residualValueBeforeFD: [this.vehicle.vehicle.residualValueBeforeFD, Validators.pattern(/^[0-9]+$/)],
        engineNo: [this.vehicle.vehicle.engineNo],
        registrationDate: [this.vehicle.vehicle.registrationDate],
        totalMassKG: [this.vehicle.vehicle.totalMassKG, Validators.pattern(/^[0-9]+$/)],
        lengthOverallMM: [this.vehicle.vehicle.lengthOverallMM, Validators.pattern(/^[0-9]+$/)],
        color: [this.vehicle.vehicle.color],
        aquisitionType: [this.vehicle.vehicle.aquisitionType.name, [
          this.sv.notListed(this.types.aquisitionTypes.map(type => type.name))
        ]],
        aquisitionOtherTypeDetail: [
          this.vehicle.vehicle.aquisitionType.name === '其他' && this.vehicle.vehicle.aquisitionOtherTypeDetail ?
             this.vehicle.vehicle.aquisitionOtherTypeDetail : ''
        ],
        displacementL: [this.vehicle.vehicle.displacementL, Validators.pattern(/^[0-9]{1,2}\.?[0-9]?$/)],
        fuelType: [this.vehicle.vehicle.fuelType.name, [
          this.sv.notListed(this.types.fuelTypes.map(type => type.name))
        ]],
        seats: [this.vehicle.vehicle.seats, Validators.pattern(/^[0-9]{1,2}$/)],
        isNEV: [this.vehicle.vehicle.isNEV ? true : false, [this.sv.isBoolean()]],
      }),
      owner: this.fb.group({
        name: [this.vehicle.owner.name, Validators.required],
        address: [this.vehicle.owner.address],
        zipCode: [this.vehicle.owner.zipCode, Validators.pattern(/^[0-9]{6,6}$/)],
        idType: [this.vehicle.owner.idType.name, [
          this.sv.notListedBasedOnOtherControlTF('isPerson', [
            this.types.oIdTypes.map(type => type.name),
            this.types.pIdTypes.map(type => type.name),
          ])
        ]],
        idOtherTypeName: [this.vehicle.owner.idOtherTypeName],
        idNo: [this.vehicle.owner.idNo],
        tel: [this.vehicle.owner.tel, Validators.pattern(/^[0-9]{7,11}$/)],
        isPerson: [this.vehicle.owner.isPerson],
        isRemote: [this.vehicle.owner.isRemote],
        isByAgent: [this.vehicle.owner.isByAgent]
      }),
      agent: this.fb.group({
        name: [this.vehicle.agent.name],
        idType: [this.vehicle.owner.idType.name, this.sv.notListed(this.types.pIdTypes.map(type => type.name))],
        idOtherTypeName: [this.vehicle.owner.idOtherTypeName],
        idNo: [this.vehicle.agent.idNo],
        tel: [this.vehicle.agent.tel, Validators.pattern(/^[0-9]{7,11}$/)],
      }),
      docsProvided: this.fb.group({
        vRegistrationCert: [this.vehicle.docsProvided.vRegistrationCert ? this.vehicle.docsProvided.vRegistrationCert : false],
        vLicenseA: [this.vehicle.docsProvided.vLicenseA],
        vLicenseB: [this.vehicle.docsProvided.vLicenseB],
        plateCount: [this.vehicle.docsProvided.plateCount, Validators.pattern(/^[0-2]$/)],
        infoQueryForm: [this.vehicle.docsProvided.infoQueryForm],
        ownerOIdCopy: [this.vehicle.docsProvided.ownerOIdCopy],
        ownerPIdCopy: [this.vehicle.docsProvided.ownerPIdCopy],
        agentIdCopy: [this.vehicle.docsProvided.agentIdCopy],
        registrationTransferDeregistrationApplication: [this.vehicle.docsProvided.registrationTransferDeregistrationApplication],
        surveyRecords: [this.vehicle.docsProvided.surveyRecords],
        powerOfAttorney: [this.vehicle.docsProvided.powerOfAttorney],
        orgDeregistrationFormCopy: [this.vehicle.docsProvided.orgDeregistrationFormCopy],
        orgRenamingDoc: [this.vehicle.docsProvided.orgRenamingDoc],
        statementOfLossOnNewspaper: [this.vehicle.docsProvided.statementOfLossOnNewspaper],
        ownershipCert: [this.vehicle.docsProvided.ownershipCert],
        affiliationAgreement: [this.vehicle.docsProvided.affiliationAgreement],
        others: [this.vehicle.docsProvided.others],
      }),
      feesAndDeductions: this.fb.array([]),
      vehicleCosts: this.fb.array([]),
    });


    /* start of - setting up vehicleCosts */
    const vCFormGroups: FormGroup[] = this.vehicle.vehicleCosts.map(vC => this.fb.group({
      type: [{value: vC.type.name, disabled: true}],
      details: vC.details,
      amount: vC.amount
    }));
    const vCFormArray = this.fb.array(vCFormGroups);
    this.vehicleForm.setControl('vehicleCosts', vCFormArray);

    /* end of - setting up vehicleCosts */

    /* start of - setting up this.vehicleForm.controls('feesAndDeductions')*/
    const fds = this.vehicle.feesAndDeductions.map(fd => this.fb.group({
      type: [{value: fd.type.name, disabled: true}],
      part: [fd.part && fd.part.name],
      details: [fd.details],
      amount: [fd.amount, Validators.pattern(/^[0-9]+$/)]
    }));
    const fdsFormArray = this.fb.array(fds);
    this.vehicleForm.setControl('feesAndDeductions', fdsFormArray);
    /* end of - setting up this.vehicleForm.controls('feesAndDeductions')*/

    /* set rvAfterFD */
    const rvCal_ = Observable.merge(
      this.vehicleForm.get('vehicle.residualValueBeforeFD').valueChanges, 
      this.vehicleForm.get('feesAndDeductions').valueChanges)
      .startWith(null)
      .subscribe(() => {
        const residualValueBeforeFD = this.vehicleForm.get('vehicle.residualValueBeforeFD').value;
        let feesAndDeductions = 0;
        (this.vehicleForm.get('feesAndDeductions') as FormArray).controls.forEach(ctrl => {
          feesAndDeductions += ctrl.get('amount').value;
        });
        this.rvAfterFD = residualValueBeforeFD - feesAndDeductions;
      });

    this.subscriptions.push(rvCal_);

    // this.dismantlingOrdersForm = this.fb.group({
    //   dismantlingOrders: this.fb.array(this.dismantlingOrdersInput.map(dOrder => this.fb.group({
    //     id: {value: dOrder.id, disabled: true},
    //     vin: [dOrder.vin],
    //     orderType: [{value: dOrder.orderType, disabled: true}, this.sv.notListedInObjList(this.types.dismantlingOrderTypes)],
    //     orderDate: [{value: dOrder.orderDate, disabled: true}],
    //     estimatedFinishDate: [{
    //       value: dOrder.estimatedFinishDate,
    //       disabled: dOrder.estimatedFinishDate ? true : false
    //     }],
    //     actualFinishDate: [{
    //       value: dOrder.actualFinishDate,
    //       disabled: dOrder.actualFinishDate ? true : false
    //     }]
    //   })))
    // });


    /* start of - setting up this.vehicleForm.controls('remarks')*/
    const remarks = this.vehicle.remarks.map(r => this.fb.group({
      content: [{value: r.content, disabled: true}],
      date: [{value: r.date, disabled: true}],
      by: [{value: r.by, disabled: true}]
    }));
    const remarksFormArray = this.fb.array(remarks);
    this.vehicleForm.setControl('remarks', remarksFormArray);
    /* end of - setting up this.vehicleForm.controls('remarks')*/


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
      change ... on mofcomRegisterType changes
    */
    const mofcomRegisterTypeChange_ = this.vehicleForm.get('mofcomRegisterType').valueChanges
      .subscribe(value => {
        switch (value.name) {
          // change isRemote on mofcomRegisterTypeChange
          case '异地':
            this.vehicleForm.get('owner.isRemote').setValue(true);
            break;
          default:
            this.vehicleForm.get('owner.isRemote').setValue(false);
        }
      });

    this.subscriptions.push(mofcomRegisterTypeChange_);

    const isPersonChange_ = this.vehicleForm.get('owner.isPerson').valueChanges
      .subscribe(value => {
        this.vehicleForm.get('owner.idType').setValue('');
      });

    this.subscriptions.push(isPersonChange_);

    // const brandChange_ = this.vehicleForm.get('vehicle.brand').valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   })
  }


  // -------- start of dismantlingOrders related methods --------
  // get dismantlingOrders(): FormArray  {
  //   return this.dismantlingOrdersForm.get('dismantlingOrders') as FormArray;
  // }

  // addDismantlingOrder() {
  //   this.dismantlingOrders.push(this.fb.group({
  //     id: {value: '待定', disabled: true},
  //     vin: [this.vehicle.vin],
  //     orderType: ['', this.sv.notListedInObjList(this.types.dismantlingOrderTypes)],
  //     orderDate: [(new Date()).toISOString().slice(0, 10)],
  //     estimatedFinishDate: [''],
  //     actualFinishDate: ['']
  //   }));
  // }

  // -------- end of dismantlingOrders related methods --------

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
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
