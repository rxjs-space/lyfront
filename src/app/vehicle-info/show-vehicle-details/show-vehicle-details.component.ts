import { Component, EventEmitter, OnInit, OnChanges, OnDestroy, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';
import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';
import { DisplayFunctionsService } from '../../shared/display-functions/display-functions.service';

import jsonpatch from 'fast-json-patch';


@Component({
  selector: 'app-show-vehicle-details',
  templateUrl: './show-vehicle-details.component.html',
  styleUrls: ['./show-vehicle-details.component.scss']
})
export class ShowVehicleDetailsComponent implements OnInit, OnChanges, OnDestroy {
  vehicleForm: FormGroup;
  // dismantlingOrdersForm: FormGroup;
  @Input() vehicle;
  @Input() types;
  @Input() titles;
  @Input() brands;
  // @Input() dismantlingOrdersInput;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() methods: any;
  rvAfterFDRxx = new BehaviorSubject(0); // residual value after fees and deductions
  filteredVTypesRx: Observable<any[]>;
  filteredUseCharactersRx: Observable<any[]>;
  filteredBrandsRx: Observable<any[]>;
  pendingOps = new BehaviorSubject(0);
  subscriptions: Subscription[] = [];
  initSubscriptions: Subscription[] = [];
  isNew: Boolean;

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

  ngOnChanges() {
    // if (!!this.vehicleForm) {
    //   this.initSubscriptions.forEach(sub_ => sub_.unsubscribe());
    //   this.vehicleForm = null;
    //   this.ngOnInit.call(this);
    // }

  }

  onBrandBlur(event) {
    // this.pendingOps.next(this.pendingOps.getValue() + 1);
    // const brandName = event.target.value;
    // if (brandName && !this.types.brands.find(b => b.name === brandName)) {
    //   return this.createBrandIfNone(brandName)
    //     .catch(error => Observable.of({ok: false, error}))
    //     .subscribe(result => {
    //       if (result.error) {
    //         console.log(result.error);
    //         return;
    //       } else {
    //         console.log('got new brands');
    //         this.pendingOps.next(this.pendingOps.getValue() - 1);
    //         this.types.brands = result.brands;
    //       }
    //     });
    // }
  }

  checkValidity() {
    this.markAllAsDirtyAndTouched(this.vehicleForm);
    // console.log(this.vehicleForm.get('vehicle.plateNo').errors);
  }

  markAllAsDirtyAndTouched(control: AbstractControl) {
    if (control.hasOwnProperty('controls')) {
      // control.markAsDirty(true); // mark group
      control.markAsTouched(true); // mark group
      const ctrl = <any>control;
      for (let inner in ctrl.controls) {
        this.markAllAsDirtyAndTouched(ctrl.controls[inner] as AbstractControl);
      }
    } else {
      // (<FormControl>(control)).markAsDirty(true);
      (<FormControl>(control)).markAsTouched(true);
    }
  }

  createBrandIfNone(brandName: string) {
    const newBrands = this.types.brands.slice().concat([{
      id: (this.types.brands.length + 1).toString(),
      name: brandName
    }]);
    return this.methods.updateBrands(newBrands) as Observable<any>;
  }

  prepareSubmit(vehicleForm: FormGroup) {
    const sub_ = this.pendingOps
      .filter(v => {
        return v === 0;
      })
      .first()
      .map(() => { // after all pendingOps done (including updateBrands)
        console.log('preparing');
        const vehicleToSubmit = JSON.parse(JSON.stringify(this.vehicleForm.getRawValue()));
        // const typeNameToTypeObj = (typeNameItem, typeObjDict: any[]): void => {
        //   typeNameItem = typeObjDict.find(t => t.name === typeNameItem);
        //   if (!Boolean(typeNameItem)) {
        //     typeNameItem = null;
        //   }
        // };
        // typeNameToTypeObj(vehicleToSubmit.mofcomRegisterType, this.types.mofcomRegisterTypes);
        // console.log(vehicleToSubmit.mofcomRegisterType);
        const nameToId = (name, types) => {
          const matchObj = types.find(t => t.name === name) || null;
          return matchObj ? (matchObj.id || matchObj._id) : '';
        };
        vehicleToSubmit.mofcomRegisterType = nameToId(vehicleToSubmit.mofcomRegisterType, this.types.mofcomRegisterTypes);
        vehicleToSubmit.vehicle.vehicleType = nameToId(vehicleToSubmit.vehicle.vehicleType, this.types.vehicleTypes);
        vehicleToSubmit.vehicle.useCharacter = nameToId(vehicleToSubmit.vehicle.useCharacter, this.types.useCharacters);
        vehicleToSubmit.vehicle.aquisitionType = nameToId(vehicleToSubmit.vehicle.aquisitionType, this.types.aquisitionTypes);
        vehicleToSubmit.vehicle.fuelType = nameToId(vehicleToSubmit.vehicle.fuelType, this.types.fuelTypes);
        vehicleToSubmit.agent.idType = nameToId(vehicleToSubmit.agent.idType, this.types.idTypes);
        vehicleToSubmit.feesAndDeductions.forEach(fd => {
          fd.type = nameToId(fd.type, this.types.feesAndDeductionsTypes);
          if (fd.part) {
            fd.part = nameToId(fd.part, this.types.parts);
          }
        });
        vehicleToSubmit.vehicleCosts.forEach(vc => {
          vc.type = nameToId(vc.type, this.types.vehicleCostTypes);
        });
        vehicleToSubmit.owner.idType = nameToId(vehicleToSubmit.owner.idType, this.types.idTypes);
        vehicleToSubmit.vehicle.brand = nameToId(vehicleToSubmit.vehicle.brand, this.brands);
        // this.types.brands.find(t => t.name === vehicleToSubmit.vehicle.brand) || null;
        delete vehicleToSubmit.idConfirm;

        // at the end of submit, reset some status
        this.vehicleForm.markAsPristine();
        for (const ctrl in (this.vehicleForm.get('status') as FormGroup).controls) {
          if (this.vehicleForm.get(`status.${ctrl}.done`).value) {
            this.vehicleForm.get(`status.${ctrl}.done`).disable();
          }
        }

        return vehicleToSubmit;
      })
      .subscribe(v => {
        console.log(v);
        const diff = jsonpatch.compare(this.vehicle, v);
        console.log(diff);
        // this.save.emit({
        //   id: v.id,
        //   details: v
        // });
      });


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

  idToName(key, id?, types?) {
    id = id ? id : this.vehicle[key];
    types = types ? types : this.types[`${key}s`];
    if (!id) {return ''; } // if id is an empty string
    let matchObj;
    if (types[0].id) {
      matchObj = types.find(i => i.id === id);
    } else {
      matchObj = types.find(i => i._id === id);
    }
    if (!matchObj) {throw new Error('invalid id'); } // if there's no matching obj for the id
    return matchObj['name'];
  }

  disableIfDone(done) {
    return {
      value: done,
      disabled: done ? true : false
    }
  }

  ngOnInit() {
    this.isNew = !this.vehicle.id; // setup isNew based on whether vehicl.id exists
    this.vehicleForm = this.fb.group({
      id: [this.vehicle.id, Validators.required],
      batchId: [this.vehicle.batchId],
      isToDeregister: [this.vehicle.isToDeregister],
      mofcomRegisterType: [this.idToName('mofcomRegisterType'), [
        this.sv.notListedButCanBeEmpty(this.types.mofcomRegisterTypes.map(t => t.name))
      ]],
      mofcomRegisterRef: [this.vehicle.mofcomRegisterRef],
      entranceDate: [this.vehicle.entranceDate || (new Date()).toISOString().slice(0, 10)],
      metadata: this.fb.group({
        isDeleted: [this.vehicle.metadata.isDeleted],
        deletedFor: [this.vehicle.metadata.deletedFor],
        deletedBy: [this.vehicle.metadata.deletedBy],
        deletedAt: [this.vehicle.metadata.deletedAt],
        createdAt: [this.vehicle.metadata.createdAt],
        createdBy: [this.vehicle.metadata.createdBy],
        lastModifiedAt: [this.vehicle.metadata.lastModifiedAt],
        lastModifiedBy: [this.vehicle.metadata.lastModifiedBy],
      }),
      status: this.fb.group({
        ownerDocsReady: this.fb.group({
          done: [this.disableIfDone(this.vehicle.status.ownerDocsReady.done)],
          date: [this.vehicle.status.ownerDocsReady.date]
        }),
        platesCollectedByOwner: this.fb.group({
          done: [this.disableIfDone(this.vehicle.status.platesCollectedByOwner.done)],
          date: [this.vehicle.status.platesCollectedByOwner.date]
        }),
        rubbing: this.fb.group({
          done: [this.disableIfDone(this.vehicle.status.rubbing.done)],
          date: [this.vehicle.status.rubbing.date]
        }),
        photosOnEntrance: this.fb.group({
          done: [this.disableIfDone(this.vehicle.status.photosOnEntrance.done)],
          date: [this.vehicle.status.photosOnEntrance.date]
        }),
        photosAfterCuttingUp: this.fb.group({
          done: [this.disableIfDone(this.vehicle.status.photosAfterCuttingUp.done)],
          date: [this.vehicle.status.photosAfterCuttingUp.date]
        }),
        policeSiteEntry: this.fb.group({
          done: [this.disableIfDone(this.vehicle.status.policeSiteEntry.done)],
          date: [this.vehicle.status.policeSiteEntry.date]
        }),
        mofcomEntry: this.fb.group({
          done: [this.disableIfDone(this.vehicle.status.mofcomEntry.done)],
          date: [this.vehicle.status.mofcomEntry.date]
        }),
        mofcomCertReady: this.fb.group({
          done: [this.disableIfDone(this.vehicle.status.mofcomCertReady.done)],
          date: [this.vehicle.status.mofcomCertReady.date],
        }),
        mofcomCertCollectedByOwnerAndSigned: this.fb.group({
          done: [this.disableIfDone(this.vehicle.status.mofcomCertCollectedByOwnerAndSigned.done)],
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
      }),
      vehicle: this.fb.group({
        plateNo: [this.vehicle.vehicle.plateNo, [Validators.required, Validators.pattern(/^.{7,7}$/)]],
        vehicleType: [this.idToName('vehicleType', this.vehicle.vehicle.vehicleType), [
          this.sv.notListedButCanBeEmpty(this.types.vehicleTypes.map(type => type.name))
        ]],
        useCharacter: [this.idToName('useCharacter', this.vehicle.vehicle.useCharacter), [
          this.sv.notListedButCanBeEmpty(this.types.useCharacters.map(type => type.name))
        ]],
        brand: [this.idToName('brand', this.vehicle.vehicle.brand, this.brands)],
        model: [this.vehicle.vehicle.model],
        conditionOnEntrance: [this.vehicle.vehicle.conditionOnEntrance],
        residualValueBeforeFD: [this.vehicle.vehicle.residualValueBeforeFD, Validators.pattern(/^[0-9]+$/)],
        engineNo: [this.vehicle.vehicle.engineNo],
        registrationDate: [this.vehicle.vehicle.registrationDate],
        totalMassKG: [this.vehicle.vehicle.totalMassKG, Validators.pattern(/^[0-9]+$/)],
        lengthOverallMM: [this.vehicle.vehicle.lengthOverallMM, Validators.pattern(/^[0-9]+$/)],
        color: [this.vehicle.vehicle.color],
        aquisitionType: [this.idToName('aquisitionType', this.vehicle.vehicle.aquisitionType), [
          this.sv.notListedButCanBeEmpty(this.types.aquisitionTypes.map(type => type.name))
        ]],
        aquisitionOtherTypeDetail: [this.vehicle.vehicle.aquisitionOtherTypeDetail],
        displacementL: [this.vehicle.vehicle.displacementL, Validators.pattern(/^[0-9]{1,2}\.?[0-9]?$/)],
        fuelType: [this.idToName('fuelType', this.vehicle.vehicle.fuelType), [
          this.sv.notListedButCanBeEmpty(this.types.fuelTypes.map(type => type.name))
        ]],
        seats: [this.vehicle.vehicle.seats, Validators.pattern(/^[0-9]{1,2}$/)],
        isNEV: [this.vehicle.vehicle.isNEV ? true : false, [this.sv.isBoolean()]],
      }),
      owner: this.fb.group({
        name: [this.vehicle.owner.name, Validators.required],
        address: [this.vehicle.owner.address],
        zipCode: [this.vehicle.owner.zipCode, Validators.pattern(/^[0-9]{6,6}$/)],
        idType: [this.idToName('idType', this.vehicle.owner.idType), [
          this.sv.notListedBasedOnOtherControlTFButCanBeEmpty('isPerson', [
            this.types.oIdTypes.map(type => type.name),
            this.types.pIdTypes.map(type => type.name),
          ])
        ]],
        idOtherTypeName: [this.vehicle.owner.idOtherTypeName],
        idNo: [this.vehicle.owner.idNo],
        tel: [this.vehicle.owner.tel, Validators.pattern(/^[0-9]{7,11}$/)],
        isPerson: [this.vehicle.owner.isPerson],
        isByAgent: [this.vehicle.owner.isByAgent]
      }),
      agent: this.fb.group({
        name: [this.vehicle.agent ? this.vehicle.agent.name : ''],
        idType: [this.idToName('idType', this.vehicle.agent.idType), 
          this.sv.notListedButCanBeEmpty(this.types.pIdTypes.map(type => type.name))],
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
      vehicleCosts: this.fb.array(this.vehicle.vehicleCosts.map(vC => this.fb.group({
        type: [{value: this.idToName(null, vC.type, this.types.vehicleCostTypes), disabled: true}],
        details: vC.details,
        amount: vC.amount
      }))),
    });

    /* disable the control if status.done */
    const statusObj = this.vehicle.status;
    setTimeout(() => {
      Object.keys(statusObj).forEach(k => {
        if (statusObj[k].done) {
          const ctrl = (this.vehicleForm.get(`status.${k}.done`) as FormControl);
          // console.log(ctrl.value);
          ctrl.disable();
        }
      });
    });

    /* setting up id and idConfirm based on isNew*/
    if (this.isNew) {
      const idConfirmCtrl = new FormControl(
        '', 
        [Validators.required, 
        this.sv.matchOtherControl(this.vehicleForm.get('id'))]);
      this.vehicleForm.addControl('idConfirm', idConfirmCtrl);
    } else {
      this.vehicleForm.get('id').disable();
    }

    /* validate idConfirm once id is changed */
    if (this.vehicleForm.get('idConfirm')) {
      const id_ = this.vehicleForm.get('id').valueChanges
        .subscribe(() => {
          this.vehicleForm.get('idConfirm').updateValueAndValidity();
        });
      this.initSubscriptions.push(id_);
    }


    /* start of - setting up vehicleCosts */
    // const vCFormGroups: FormGroup[] = this.vehicle.vehicleCosts.map(vC => this.fb.group({
    //   type: [{value: this.idToName(null, vC.type, this.types.vehicleCostTypes), disabled: true}],
    //   details: vC.details,
    //   amount: vC.amount
    // }));
    // const vCFormArray = this.fb.array(vCFormGroups);
    // this.vehicleForm.setControl('vehicleCosts', vCFormArray);

    /* end of - setting up vehicleCosts */

    /* start of - setting up this.vehicleForm.controls('feesAndDeductions')*/
    const fds = this.vehicle.feesAndDeductions.map(fd => this.fb.group({
      type: [{value: this.idToName(null, fd.type, this.types.feesAndDeductionsTypes), disabled: true}],
      part: [this.idToName(null, fd.part, this.types.parts), this.sv.notListedButCanBeEmpty(this.types.parts.map(p => p.name))],
      details: [fd.details],
      amount: [fd.amount, [Validators.pattern(/^[0-9]+$/), Validators.required]]
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
        this.rvAfterFDRxx.next(residualValueBeforeFD - feesAndDeductions);
      });

    this.initSubscriptions.push(rvCal_);

    /* watching status and setup date*/
    // const statusDate_ = this.vehicleForm.get()

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



    const isPersonChange_ = this.vehicleForm.get('owner.isPerson').valueChanges
      .subscribe(value => {
        this.vehicleForm.get('owner.idType').setValue('');
        if (!value) {
          this.vehicleForm.get('owner.isByAgent').setValue(true);
          this.vehicleForm.get('owner.isByAgent').disable();
        } else {
          this.vehicleForm.get('owner.isByAgent').enable();
        }
      });


    Object.keys(statusObj).forEach(k => {
      this.vehicleForm.get(`status.${k}.done`).valueChanges
        .subscribe(v => {
          const dateCtrl = this.vehicleForm.get(`status.${k}.date`);
          if (v && !dateCtrl.value) {
            this.vehicleForm.get(`status.${k}.date`).setValue((new Date()).toISOString().slice(0, 10));
          }

          if (!v && dateCtrl.value) {
            this.vehicleForm.get(`status.${k}.date`).setValue('');
          }
        });
    })


    this.initSubscriptions.push(isPersonChange_);
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
    this.initSubscriptions.forEach(sub_ => sub_.unsubscribe());
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
