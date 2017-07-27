import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
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
  subscriptions: Subscription[] = [];
  doForm: FormGroup;
  pwForm: FormGroup;
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
      vehicleType: [{value: (this.isNew ? this.vehicle.vehicle.vehicleType : oldDO.vehicleType), disabled: true}], // this is displayName now
      planners: [{value: (this.isNew ? [this.auth.getUserDisplayName()] : oldDO.planners)}], // this is displayName now
      productionOperators: [{value: oldDO.vin}] // also displayName now
      // partsAndWastesPlanned: [],
      // partsAndWastesProduced: [],
    });

    // - typeId, planned, isMissingBeforeEntrance, conditionBeforeDismantling(intact, defective, unobservable), 
    // - typeId, actual, noteByProductionOperator, itemIdAfterDismantling

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


