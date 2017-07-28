import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
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


@Component({
  selector: 'app-dismantling-order-details2',
  templateUrl: './dismantling-order-details2.component.html',
  styleUrls: ['./dismantling-order-details2.component.scss']
})
export class DismantlingOrderDetails2Component implements OnInit, OnDestroy {
  @Input() vehicle;
  @Input() dismantlingOrder: DismantlingOrder;
  @Input() btity;
  @Input() isNew;
  @Input() staffs;
  @Input() saveTriggerRxx: Subject<any>;
  @Output() isChangedAndValid = new EventEmitter();
  @Output() saved = new EventEmitter();
  subscriptions: Subscription[] = [];
  doForm: FormGroup;
  pwPPForm: FormArray;
  fformsRxx = new Subject();
  patches = [];
  newDismantlingOrder;
  isSaving = false;
  constructor(
    private backend: DataService,
    private auth: AuthService,
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }

  ngOnInit() {
    this.rebuildForm();
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
      isAdHoc: [{value: oldDO.isAdHoc, disabled: !this.isNew}, [Validators.required, this.sv.shouldBeBoolean]],
      orderType: [(oldDO.orderType ? oldDO.orderType : this.btity.types['dismantlingOrderTypes'][0]['id'])],
      correspondingSalesOrderId: [{value: oldDO.correspondingSalesOrderId, disabled: !this.isNew}],
      startedAt: [{value: oldDO.startedAt, disabled: true}],
      completedAt: [{value: oldDO.completedAt, disabled: true}],
      vin: [{value: (this.isNew ? this.vehicle.vin : oldDO.vin), disabled: true}],
      vehicleType: [{
        value: (this.isNew ? this.vehicle.vehicle.vehicleType : oldDO.vehicleType),
        disabled: true}], // this is displayName now
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
      noItemToRecycle: [oldDO.noItemToRecycle],
      confirmDismantlingCompleted: [oldDO.confirmDismantlingCompleted]
    });

    if (this.isNew) {
      this.doForm.get('productionOperators').clearValidators();
    }

    const partsAndWastesTypes = this.btity.types.parts.concat(this.btity.types.wastes);
    const partsAndWastesPPInOldDO = this.dismantlingOrder.partsAndWastesPP; // plan and production

    let partsAndWastesPP;
    if (this.isNew) {
      partsAndWastesPP = partsAndWastesTypes.map(pw => { // combine the plan and production
        const id = pw.id;
        const matchedPP = partsAndWastesPPInOldDO.find(PW => PW.id === id);
        if (matchedPP) {
          matchedPP.name = pw.name;
          return matchedPP;
        } else {
          pw.countPlan = 0;
          pw.conditionBeforeDismantling = '忽略';
          pw.noteByPlanner = '';
          pw.countProduction = '';
          pw.noteByProductionOperator = '';
          pw.itemIdAfterDismantling = '';
          return pw;
        }
      });
    } else {
      partsAndWastesPP = partsAndWastesPPInOldDO.map(pw => {
        const id = pw.id;
        const name = partsAndWastesTypes.find(item => item.id = id).name;
        pw.name = name;
        return pw;
      });
    }


    // console.log(partsAndWastesPPWithTypeNames);
    this.pwPPForm = this.fb.array(partsAndWastesPP.map(pwPP => {
      return this.fb.group({
        id: [{value: pwPP.id, disabled: true}],
        name: [{value: pwPP.name, disabled: true}],
        countPlan: [{value: pwPP.countPlan, disabled: this.isNew ? false : true}, [Validators.pattern(/^[0-9]+$/), Validators.required]],
        conditionBeforeDismantling: [{
          value: pwPP.conditionBeforeDismantling,
          disabled: this.isNew ? false : true
        }, [
          Validators.required,
          this.sv.notListedButCanBeEmpty(this.btity.types['conditionBeforeDismantlingTypes'].map(t => t.name))
        ]],
        noteByPlanner: [{value: pwPP.noteByPlanner, disabled: this.isNew ? false : true}],
        countProduction: [pwPP.countProduction, [Validators.pattern(/^[0-9]+$/)]],
        noteByProductionOperator: [pwPP.noteByProductionOperator],
        itemIdAfterDismantling: [pwPP.itemIdAfterDismantling],
      });
    }));

    const sub0_ = this.pwPPForm.valueChanges
      .subscribe(pws => {
        pws.forEach((pw, index) => {
          if (pw.countPlan > 0 && pw.conditionBeforeDismantling === '忽略') {
            this.pwPPForm.get([index, 'conditionBeforeDismantling']).setValue('');
          }
          const prodNote = this.pwPPForm.get([index, 'noteByProductionOperator']);
          if (pw.countProduction === 0) {
            prodNote.setValidators(Validators.required);
          } else {
            prodNote.clearValidators();
          }
            prodNote.updateValueAndValidity();
        });
      });
    this.subscriptions.push(sub0_);

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
          startedAtCtrl.setValue((new Date()).toISOString().substring(0, 10));
        }
      });

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
    rawCopy.vehicleType = this.fu.nameToId(rawCopy.vehicleType, this.btity.types['vehicleTypes']);
    const pwsPP = rawCopy.partsAndWastesPP;
    let processedPwsPP = [];
    pwsPP.forEach((pw, index) => {
      if (!(pw.conditionBeforeDismantling === '忽略' && pw.countProduction === 0)) {
        pw.conditionBeforeDismantling = this.fu.nameToId(
          pw.conditionBeforeDismantling, this.btity.types['conditionBeforeDismantlingTypes']
        );
        delete pw.name;
        processedPwsPP.push(pw);
      }
    });
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


