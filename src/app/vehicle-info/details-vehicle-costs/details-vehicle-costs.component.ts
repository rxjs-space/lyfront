import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { DialogVehicleCostsComponent } from '../dialog-vehicle-costs/dialog-vehicle-costs.component';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-details-vehicle-costs',
  templateUrl: './details-vehicle-costs.component.html',
  styleUrls: ['./details-vehicle-costs.component.scss']
})
export class DetailsVehicleCostsComponent implements OnInit, OnDestroy {
  @Input() titles;
  @Input() types;
  @Input() formGroupInput: FormArray;
  @Input() methods: any;
  @Input() rvAfterFD: number;
  vCostCtrls: AbstractControl[];
  subscriptions: Subscription[] = [];
  costSum: number;
  hasTBD: boolean = false;
  toShowDetails: boolean = false;
  constructor(public dialog: MdDialog) { }

  ngOnInit() {
    this.vCostCtrls = this.formGroupInput.controls;
    const sum_ = this.formGroupInput.valueChanges
      .startWith(null)
      .subscribe(() => {
        let sumWithoutRV = 0;
        let prodWithoutRV = 1;
        this.vCostCtrls.forEach(ctrl => {
          const amount = ctrl.get('amount').value;
          sumWithoutRV += +amount;
          prodWithoutRV *= +amount;
        });
        this.costSum = sumWithoutRV + this.rvAfterFD;
        this.hasTBD = !prodWithoutRV;
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }
}
