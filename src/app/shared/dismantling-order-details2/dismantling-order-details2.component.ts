import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { SharedValidatorsService } from '../validators/shared-validators.service';
import { FormUtilsService } from '../form-utils/form-utils.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DismantlingOrder } from '../../data/dismantling-order';
import { AuthService } from '../../auth/auth.service';

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
  subscriptions: Subscription[] = [];
  doForm: FormGroup;
  pwPPForm: FormArray;
  fformsRxx = new Subject();
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }

  ngOnInit() {
    this.rebuildForm();
  }

  rebuildForm() {
    console.log(this.isNew);
    console.log(this.vehicle);
    const oldDO: DismantlingOrder = JSON.parse(JSON.stringify(this.dismantlingOrder));
    this.doForm = this.fb.group({
      orderDate: [{value: oldDO.orderDate, disabled: true}],
      isAdHoc: [{value: oldDO.isAdHoc, disabled: !this.isNew}, [Validators.required, this.sv.shouldBeBoolean]],
      correspondingSalesOrderId: [{value: oldDO.correspondingSalesOrderId, disabled: !this.isNew}],
      startedAt: [{value: oldDO.startedAt, disabled: true}],
      completedAt: [{value: oldDO.completedAt, disabled: true}],
      vin: [{value: (this.isNew ? this.vehicle.vin : oldDO.vin), disabled: true}],
      vehicleType: [{
        value: (this.isNew ? this.vehicle.vehicle.vehicleType : oldDO.vehicleType), 
        disabled: true}], // this is displayName now
      planners: [this.isNew ? [this.auth.getUserDisplayName()] : oldDO.planners], // this is displayName now
      productionOperators: [oldDO.productionOperators] // also displayName now
      // partsAndWastesPlanned: [],
      // partsAndWastesProduced: [],
    });
    const partsAndWastesTypes = this.btity.types.parts.concat(this.btity.types.wastes);
    const partsAndWastesPPInOldDO = this.dismantlingOrder.partsAndWastesPP; // plan and production

    const partsAndWastesPPWithTypeNames = partsAndWastesTypes.map(pw => { // combine the plan and production
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

    console.log(partsAndWastesPPWithTypeNames);
    this.pwPPForm = this.fb.array(partsAndWastesPPWithTypeNames.map(pwPP => {
      return this.fb.group({
        id: [{value: pwPP.id, disabled: true}],
        name: [{value: pwPP.name, disabled: true}],
        countPlan: [pwPP.countPlan],
        conditionBeforeDismantling: [pwPP.conditionBeforeDismantling, [
          Validators.required,
          this.sv.notListedButCanBeEmpty(this.btity.types['conditionBeforeDismantlingTypes'].map(t => t.name))
        ]],
        noteByPlanner: [pwPP.noteByPlanner],
        countProduction: [pwPP.countProduction],
        noteByProductionOperator: [pwPP.noteByProductionOperator],
        itemIdAfterDismantling: [pwPP.itemIdAfterDismantling],
      });
    }));

    setTimeout(() => {
      this.fformsRxx.next([this.doForm, this.pwPPForm]);
    }, 0)
    // this.pwPlanedForm = this.fb.array(this.btity)
    // - id, count, conditionBeforeDismantling(intact, defective, unobservable), 
    // - id, count, noteByProductionOperator, itemIdAfterDismantling

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


