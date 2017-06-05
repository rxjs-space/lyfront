import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { DialogVehicleCostsComponent } from '../dialog-vehicle-costs/dialog-vehicle-costs.component';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/startWith';
import { DialogYesOrNoComponent } from '../../shared/dialog-yes-or-no/dialog-yes-or-no.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';


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
  @Input() rvAfterFDRxx: any;
  vCostCtrls: AbstractControl[];
  subscriptions: Subscription[] = [];
  costSum: number;
  hasTBD: boolean = false;
  toShowDetails: boolean = false;
  constructor(public dialog: MdDialog) { }

  openDialogNewVCosts() {
    const dialogRef = this.dialog.open(DialogVehicleCostsComponent, {
      data: {types: this.types, titles: this.titles},
    });
    const dialogSub_ = dialogRef.afterClosed().subscribe((newVCostsForm: FormGroup) => {
      if (newVCostsForm) {
        this.methods.new(newVCostsForm);
      }
    });
    this.subscriptions.push(dialogSub_);

  }

  openDialogDeleteFD(index: number) {
    const dialogRef = this.dialog.open(DialogYesOrNoComponent, {
      data: {
        message: '删除此条记录？',
        index
      }
    });
    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.methods.delete(index);
      }
    });

  }



  ngOnInit() {
    this.vCostCtrls = this.formGroupInput.controls;

    Observable.combineLatest(this.formGroupInput.valueChanges.startWith(null), this.rvAfterFDRxx)
      .subscribe(combo => {
        console.log(combo);
        let sumWithoutRV = 0;
        let prodWithoutRV = 1;
        if (combo[0]) {
          combo[0].forEach(item => {
            const amount = item['amount'];
            sumWithoutRV += +amount;
            prodWithoutRV *= +amount;
          });
        }
        this.costSum = sumWithoutRV + <number>combo[1];
        this.hasTBD = !prodWithoutRV;
      });


    // const sum_ = this.formGroupInput.valueChanges
    //   .startWith(null)
    //   .subscribe(() => {
    //     let sumWithoutRV = 0;
    //     let prodWithoutRV = 1;
    //     this.vCostCtrls.forEach(ctrl => {
    //       const amount = ctrl.get('amount').value;
    //       sumWithoutRV += +amount;
    //       prodWithoutRV *= +amount;
    //     });
    //     this.costSum = sumWithoutRV + this.rvAfterFD;
    //     this.hasTBD = !prodWithoutRV;
    //   });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }
}
