import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';

import { DialogNewVehicleCostComponent } from './dialog-new-vehicle-cost.component';


@Component({
  selector: 'app-vehicle-details-costs',
  templateUrl: './vehicle-details-costs.component.html',
  styleUrls: ['./vehicle-details-costs.component.scss']
})
export class VehicleDetailsCostsComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  valueChangesRx: Observable<any>;
  fform: FormGroup;
  @Input() vehicle: any;
  @Input() btity: any;
  @Input() isPersonRxx: BehaviorSubject<boolean>;
  costSum: number;
  hasTBD: boolean = false;
  subscriptions: Subscription[] = [];
  @Input() rvAfterFD: number;

  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService,
    private dialog: MdDialog
  ) { }
  ngOnInit() {
    this.fform = this.fb.group({
      vehicleCosts: this.fb.array(this.vehicle.vehicleCosts.map(vC => this.fb.group({
        fooBar: '',
        type: [{value: this.fu.idToName(vC.type, this.btity.types['vehicleCostTypes']), disabled: true}],
        details: [{value: vC.details, disabled: true}],
        amount: [{value: vC.amount, disabled: true}]
      }))),

    });

    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        // if (this.fform.valid) {
          const allV = this.fform.getRawValue();
          allV.vehicleCosts.forEach(vC => {
            delete vC.fooBar;
            vC.type = this.fu.nameToId(vC.type, this.btity.types['vehicleCostTypes']);
          });
          return allV;
        // }
      });


    const sum_ = this.fform.valueChanges
      .startWith({vehicleCosts: this.vehicle.vehicleCosts})
      .subscribe(v => {
        let sumWithoutRV = 0;
        let prodWithoutRV = 1;
        const VCs = v.vehicleCosts;
        if (VCs) {
          VCs.forEach(vc => {
            const amount = vc['amount'];
            sumWithoutRV += +amount;
            prodWithoutRV *= +amount;
          })
        }
        this.costSum = sumWithoutRV + this.rvAfterFD;
        this.hasTBD = !prodWithoutRV;
      })

    this.subscriptions.push(sum_);


  }

  onYesNoClose(event, index) {
    if (event) {
      (this.fform.get('vehicleCosts') as FormArray).removeAt(index);
      this.fform.markAsTouched();
      this.fform.markAsDirty();
    }
  }

  openDialogNewVehicleCosts() {
    const dialogRef = this.dialog.open(DialogNewVehicleCostComponent, {
      data: {btity: this.btity},
    });
    dialogRef.afterClosed().subscribe((newVCForm: FormGroup) => {
      if (newVCForm) {
        (this.fform.get('vehicleCosts') as FormArray).push(newVCForm);
        this.fform.markAsTouched();
        this.fform.markAsDirty();
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }




}
