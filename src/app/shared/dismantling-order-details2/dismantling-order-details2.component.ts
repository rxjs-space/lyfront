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
      planners: [this.isNew ? [this.auth.getUserId()] : oldDO.planners, [
        this.sv.arrayMinLength(1)
      ]],
      productionOperators: [oldDO.productionOperators, [
        this.sv.arrayMinLength(1)
      ]],
      noItemToRecycle: [oldDO.noItemToRecycle]
    });

    if (this.isNew) {
      this.doForm.get('productionOperators').clearValidators();
    }

    const partsAndWastesTypes = this.btity.types.parts.concat(this.btity.types.wastes);
    const partsAndWastesPPInOldDO = this.dismantlingOrder.partsAndWastesPP; // plan and production

    const partsAndWastesPP = partsAndWastesTypes.map(pw => { // combine the plan and production
      const id = pw.id;
      const matchedPP = partsAndWastesPPInOldDO.find(PW => PW.id === id);
      if (matchedPP) {
        matchedPP.name = pw.name;
        return matchedPP;
      } else {
        pw.countPlan = 0;
        pw.conditionBeforeDismantling = '忽略';
        pw.noteByPlanner = '';
        pw.countProduction = 0;
        pw.noteByProductionOperator = '';
        pw.itemIdAfterDismantling = '';
        return pw;
      }
    });

    // console.log(partsAndWastesPPWithTypeNames);
    this.pwPPForm = this.fb.array(partsAndWastesPP.map(pwPP => {
      return this.fb.group({
        id: [{value: pwPP.id, disabled: true}],
        name: [{value: pwPP.name, disabled: true}],
        countPlan: [pwPP.countPlan, Validators.pattern(/^[0-9]+$/)],
        conditionBeforeDismantling: [pwPP.conditionBeforeDismantling, [
          Validators.required,
          this.sv.notListedButCanBeEmpty(this.btity.types['conditionBeforeDismantlingTypes'].map(t => t.name))
        ]],
        noteByPlanner: [pwPP.noteByPlanner],
        countProduction: [pwPP.countProduction, Validators.pattern(/^[0-9]+$/)],
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
        });
      });
    this.subscriptions.push(sub0_);

    this.doForm.setControl('partsAndWastesPP', this.pwPPForm);

    setTimeout(() => {
      this.fformsRxx.next([this.doForm]);
    }, 0);

    const sub1_ = this.doForm.valueChanges.subscribe(() => {
      const v = this.doForm.getRawValue();
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

  }

  calculatePatches(oldValue, newValue) {
    const newDismantlingOrder = this.prepareDismantlingOrder(newValue);
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
        this.isSaving = false;
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


