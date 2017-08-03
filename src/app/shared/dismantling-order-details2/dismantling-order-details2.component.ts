import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import jsonpatch from 'fast-json-patch';

import { SharedValidatorsService } from '../validators/shared-validators.service';
import { FormUtilsService } from '../form-utils/form-utils.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DismantlingOrder } from '../../data/dismantling-order';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../data/data.service';
import { ddoTriggerTypes } from '../dialog-dismantling-order2';

@Component({
  selector: 'app-dismantling-order-details2',
  templateUrl: './dismantling-order-details2.component.html',
  styleUrls: ['./dismantling-order-details2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DismantlingOrderDetails2Component implements OnInit, OnDestroy {
  @Input() vehicle;
  @Input() dismantlingOrder: DismantlingOrder;
  @Input() btity;
  @Input() isNew;
  @Input() staffs;
  @Input() saveTriggerRxx: Subject<any>;
  @Input() source: string;
  @Output() isChangedAndValid = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() confirmDismantlingCompleted = new EventEmitter();
  subscriptions: Subscription[] = [];
  doForm: FormGroup;
  pwPPForm: FormArray;
  fformsRxx = new Subject();
  patches = [];
  newDismantlingOrder;
  isSaving = false;
  ddoTriggerTypes = ddoTriggerTypes;

  constructor(
    private backend: DataService,
    private auth: AuthService,
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }

  ngOnInit() {
    // console.log(JSON.stringify(this.btity.types.parts));
    this.isChangedAndValid.emit(false);
    this.rebuildForm();
    // highlight the required items
    Object.keys(this.doForm.value).forEach(k => {
      this.doForm.get(k).markAsTouched();
    });
    this.saveTriggerRxx.subscribe(() => {
      this.save();
    })
  }

  rebuildForm() {
    // console.log(this.isNew);
    // console.log(this.vehicle);
    const oldDO: DismantlingOrder = JSON.parse(JSON.stringify(this.dismantlingOrder));
    this.doForm = this.fb.group({
      orderDate: [{value: oldDO.orderDate, disabled: true}],
      orderType: [{
        value: oldDO.orderType || this.btity.types['dismantlingOrderTypes'][0]['id'],
        disabled: true
      }],
      correspondingSalesOrderId: [{value: oldDO.correspondingSalesOrderId, disabled: !this.isNew}],
      startedAt: [{value: oldDO.startedAt, disabled: true}],
      completedAt: [{value: oldDO.completedAt, disabled: true}],
      vin: [{value: (this.isNew ? this.vehicle.vin : oldDO.vin), disabled: true}],
      vehicleType: [{
        value: (this.isNew ? this.vehicle.vehicle.vehicleType : oldDO.vehicleType),
        disabled: true}],
      vtbmym: [{
        value: (this.isNew ? this.vehicle.vtbmym : oldDO.vtbmym),
        disabled: true}],
      planners: [{
        value: this.isNew ? [this.auth.getUserId()] : oldDO.planners,
        disabled: this.isNew ? false : true
      }, [
        this.sv.arrayMinLength(1)
      ]],
      productionOperators: [{
        value: oldDO.productionOperators,
        disabled: oldDO.startedAt ? true : false
      }, [
        this.sv.arrayMinLength(1)
      ]],
      confirmDismantlingCompleted: [{value: oldDO.confirmDismantlingCompleted, disabled: true}],
      progressPercentage: [{value: oldDO.progressPercentage, disabled: true}],
      inventoryInputDone: [oldDO.inventoryInputDone]
    });

    if (this.isNew) {
      this.doForm.get('productionOperators').clearValidators();
    }

    const subProgressPercentage_ = this.doForm.get('progressPercentage').valueChanges
      .startWith(oldDO.progressPercentage)
      .subscribe(v => {
        switch (true) {
          case v === 0.99 && oldDO.confirmDismantlingCompleted === false:
            this.doForm.get('confirmDismantlingCompleted').enable();
            break;
          case v < 0.99:
            this.doForm.get('confirmDismantlingCompleted').disable();
            // this.doForm.get('completedAt').setValue(''); // confirmDismantlingCompletedSub_ will handle this
            this.doForm.get('confirmDismantlingCompleted').setValue(false);
            break;
        }
      });

    this.subscriptions.push(subProgressPercentage_);
    const confirmDismantlingCompletedSub_ = this.doForm.get('confirmDismantlingCompleted').valueChanges
      .subscribe(v => {
        this.confirmDismantlingCompleted.emit(v);
        if (v) {
          this.doForm.get('completedAt').setValue(new Date());
        } else {
          this.doForm.get('completedAt').setValue('');
        }
      })
    const partsAndWastesTypes = this.btity.types.parts.concat(this.btity.types.wastes);
    const partsAndWastesPPInOldDO = this.dismantlingOrder.partsAndWastesPP; // plan and production

    let partsAndWastesPP;
    if (this.isNew) { // if isNew, present a full list of all the possible parts and wastes
      partsAndWastesPP = partsAndWastesTypes.map(pw => { // combine the plan and production
        const id = pw.id;
        const matchedPP = partsAndWastesPPInOldDO.find(PW => PW.id === id);
        if (matchedPP) {
          matchedPP.name = pw.name;
          return matchedPP;
        } else {
          pw.countPlan = 0;
          pw.conditionBeforeDismantling = 'cbd06'; // cbd06 is 忽略
          pw.noteByPlanner = '';
          pw.countProduction = '';
          pw.noteByProductionOperator = '';
          pw.productionDate = '';
          pw.inventoryInputDate = '';
          pw.productIds = [];
          // pw.productionFinished = false;
          return pw;
        }
      });
    } else { // if !isNew, add pw name only
      partsAndWastesPP = partsAndWastesPPInOldDO.map(pw => {
        // console.log(pw);
        const id = pw.id;
        const name = partsAndWastesTypes.find(item => item.id === id).name;
        pw.name = name;
        return pw;
      });
    }

    this.pwPPForm = this.fb.array(partsAndWastesPP.map(pwPP => {
      return this.fb.group({
        id: [{value: pwPP.id, disabled: true}],
        name: [{value: pwPP.name, disabled: true}],
        countPlan: [{value: pwPP.countPlan, disabled: this.isNew ? false : true}, [Validators.pattern(/^[0-9]+$/), Validators.required]],
        conditionBeforeDismantling: [{
          value: this.fu.idToName(pwPP.conditionBeforeDismantling, this.btity.types.conditionBeforeDismantlingTypes),
          disabled: this.isNew ? false : true
        }, [
          Validators.required,
          this.sv.notListedButCanBeEmpty(this.btity.types['conditionBeforeDismantlingTypes'].map(t => t.name))
        ]],
        noteByPlanner: [{value: pwPP.noteByPlanner, disabled: this.isNew ? false : true}],
        countProduction: [{value: pwPP.countProduction, disabled: true}],
        noteByProductionOperator: [{value: pwPP.noteByProductionOperator, disabled: true}],
        productionFinished: [{
          value: !!pwPP.productionDate,
          disabled: !!pwPP.productionDate
        }],
        productionIgnored: [{
          value: (pwPP.conditionBeforeDismantling === 'cbd05') ,
          disabled: (pwPP.conditionBeforeDismantling === 'cbd05')
        }],
        productionDate: [{value: pwPP.productionDate, disabled: true}],
        inventoryInputDate: [pwPP.inventoryInputDate],
        productIds: [pwPP.productIds],
      });
    }));

    const sub0_ = this.pwPPForm.valueChanges
      .subscribe(pws => {
        pws.forEach((pw, index) => {
          // console.log('x');
          if (pw.countPlan > 0 && pw.conditionBeforeDismantling === '忽略') {
            this.pwPPForm.get([index, 'conditionBeforeDismantling']).setValue('');
            this.pwPPForm.get([index, 'conditionBeforeDismantling']).markAsTouched();
          }
        });
      });
    this.subscriptions.push(sub0_);

    if (!this.isNew) {
      this.pwPPForm.controls.forEach((pwc, index) => {
        const planCountCtrl = this.pwPPForm.get([index, 'countPlan']);
        const prodCountCtrl = this.pwPPForm.get([index, 'countProduction']);
        const prodNoteCtrl = this.pwPPForm.get([index, 'noteByProductionOperator']);
        const prodFinishedCtrl = this.pwPPForm.get([index, 'productionFinished']);
        const prodDateCtrl = this.pwPPForm.get([index, 'productionDate']);
        if (!prodFinishedCtrl.value) {
          const suby_ = prodFinishedCtrl.valueChanges.subscribe(v => {
            if (v) {
              prodDateCtrl.setValue(new Date());
              prodCountCtrl.enable();
              prodCountCtrl.markAsTouched();
              prodNoteCtrl.enable();
              prodCountCtrl.setValidators([Validators.pattern(/^[0-9]+$/), Validators.required, this.sv.maxValue(planCountCtrl.value)]);
              prodCountCtrl.updateValueAndValidity();
              this.doForm.get('progressPercentage').setValue(this.calculateProgressPercentage(this.pwPPForm));
            } else {
              prodDateCtrl.setValue('');
              prodCountCtrl.disable();
              prodNoteCtrl.disable();
              prodCountCtrl.clearValidators();
              prodCountCtrl.updateValueAndValidity();
              this.doForm.get('progressPercentage').setValue(this.calculateProgressPercentage(this.pwPPForm));
            }
          });
          this.subscriptions.push(suby_);
        }
        const subx_ = prodCountCtrl.valueChanges.subscribe(v => {
          if (v === 0) {
            prodNoteCtrl.setValidators(Validators.required);
            prodNoteCtrl.markAsTouched();
          } else {
            prodNoteCtrl.clearValidators();
          }
          prodNoteCtrl.updateValueAndValidity();
        });
        this.subscriptions.push(subx_);
      });
    }

    this.doForm.setControl('partsAndWastesPP', this.pwPPForm);

    setTimeout(() => {
      this.fformsRxx.next([this.doForm]);
    }, 0);

    const sub1_ = this.doForm.valueChanges
    .delay(0)
    .subscribe(() => {
      const v = this.doForm.getRawValue();
      this.doForm.markAsTouched();
      // check if changed and valid, then emit
      switch (true) {
        case this.doForm.invalid:
          this.isChangedAndValid.emit(false);
          break;
        case (this.calculatePatches(oldDO, v).length > 0) && this.doForm.touched:
          this.isChangedAndValid.emit(true);
          break;
      }
    });

    this.subscriptions.push(sub1_);

    const sub2_ = this.doForm.get('productionOperators')
      .valueChanges
      .subscribe(v => {
        // this.doForm.markAsTouched();
        const startedAtCtrl = this.doForm.get('startedAt');
        if (!startedAtCtrl.value) {
          startedAtCtrl.setValue(new Date());
        }
      });

  }

  calculateProgressPercentage(pwPPForm: FormArray) {
    const items = pwPPForm.controls.length;
    const itemsFinishedOrIgnored = pwPPForm.controls.reduce((acc, curr) => {
      if (curr.get('productionFinished').value || curr.get('productionIgnored')) {
        acc += 1;
      }
      return acc;
    }, 0);
    const progressPercent = Math.floor((itemsFinishedOrIgnored * 100 - 1) / items) / 100; // max is 99%, confirmDismantlingCompleted is the other 1%
    return progressPercent < 0 ? 0 : progressPercent;
  }

  calculatePatches(oldValue, newValue) {
    const supplymentedNewValue = Object.assign({}, oldValue, newValue);
    // above will add in backend added properties, like 'createdAt', 'createdBy', '_id'
    const newDismantlingOrder = this.prepareDismantlingOrder(supplymentedNewValue);
    this.patches = jsonpatch.compare(oldValue, newDismantlingOrder);
    // console.log(newDismantlingOrder);
    console.log(this.patches);
    return this.patches;
  }

  prepareDismantlingOrder(raw) {
    const rawCopy = JSON.parse(JSON.stringify(raw));
    // console.log(rawCopy);
    if (rawCopy.vehicleType.indexOf('vt') === -1) {
      rawCopy.vehicleType = this.fu.nameToId(rawCopy.vehicleType, this.btity.types['vehicleTypes']);
    }
    const pwsPP = rawCopy.partsAndWastesPP;
    const processedPwsPP = [];
    let itemsFinishedOrIgnoredCount = 0;
    pwsPP.forEach((pw, index) => {
      if (pw.productionFinished || pw.productionIgnored) {
        itemsFinishedOrIgnoredCount += 1;
      }
      delete pw.name;
      delete pw.productionFinished;
      delete pw.productionIgnored;

      if (this.isNew) {

        if (pw.conditionBeforeDismantling !== '忽略') { // only keep the items whose conditionBeforeDismantling is not '忽略'
          // if (pw.conditionBeforeDismantling.indexOf('遗失') > -1) {
          //   // mark the lost parts as finished
          //   pw.productionFinished = true;
          // }
          pw.conditionBeforeDismantling = this.fu.nameToId(
            pw.conditionBeforeDismantling, this.btity.types['conditionBeforeDismantlingTypes']
          );
          processedPwsPP.push(pw);
        }

      } else {

        if (pw.productionFinished &&
          !pw.productIds.length &&
          rawCopy.inventoryInputDone &&
          (pw.conditionBeforeDismantling.indexOf('遗失') === -1)
        ) {
          // if some part is newly finished (not lost), mark the inventoryInputDone as false
          rawCopy.inventoryInputDone = false;
        }

        pw.conditionBeforeDismantling = this.fu.nameToId(
          pw.conditionBeforeDismantling, this.btity.types['conditionBeforeDismantlingTypes']
        );
        processedPwsPP.push(pw);
      }



    });

    const itemsCount = processedPwsPP.length;
    // max is 99%, confirmDismantlingCompleted is the other 1%
    rawCopy.progressPercentage = Math.floor(((itemsFinishedOrIgnoredCount) * 100 - 1) / itemsCount) / 100;

    rawCopy.partsAndWastesPP = processedPwsPP;
    this.newDismantlingOrder = rawCopy;
    return rawCopy;
  }

  save() {
    this.isSaving = true;
    if (this.isNew) {
      // save with newDismantlingOrder and patches
      // both items are calculated after any value changes
      // so, no need to re-calculate here
      this.backend.insertDismantlingOrder({
        dismantlingOrder: this.newDismantlingOrder,
        patches: this.patches
      })
      .catch(error => {
        return Observable.of({ok: false, error});
      })
      .subscribe(result => {
        console.log(result);
        if (!result.error) {
          this.isSaving = false;
          const doId = result.insertedIds[0];
          this.saved.emit(doId);
        }

      });
    } else {
      // update with patches
      this.backend.updateDismantlingOrder(this.dismantlingOrder._id, this.dismantlingOrder.vin, this.patches)
      .catch(error => {
        return Observable.of({ok: false, error});
      })
      .subscribe(result => {
        console.log(result);
        this.isSaving = false;
        this.saved.emit('anything');
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}

// export class DismantlingOrder {
//   orderDate: string = (new Date()).toISOString().slice(0, 10);
//   isAdHoc: boolean = false;
//   correspondingSalesOrderId: any = '';
//   startedAt: string = '';
//   completedAt: string = '';
//   vin: string = '';
//   vehicleType: string = '';
//   partsAndWastes: any[] = [];
//   planners: any[] = [];
//   productionOperators: any[] = [];
// }


