import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import 'rxjs/add/observable/combineLatest';

import { DialogNewFdComponent } from './dialog-new-fd.component';

@Component({
  selector: 'app-vehicle-details-fees-and-deductions',
  templateUrl: './vehicle-details-fees-and-deductions.component.html',
  styleUrls: ['./vehicle-details-fees-and-deductions.component.scss']
})
export class VehicleDetailsFeesAndDeductionsComponent implements OnInit, OnDestroy {
  valueChangesRx: Observable<any>;
  fform: FormGroup;
  fformRxx = new BehaviorSubject(null);
  @Input() vehicle: any;
  @Input() btity: any;
  @Input() vdvFormRxx: BehaviorSubject<FormGroup>;
  vdvForm: FormGroup;
  fdFormArray: FormArray;
  rvAfterFD: number;
  subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService,
    public dialog: MdDialog
  ) { }
  ngOnInit() {
    Observable.combineLatest(this.vdvFormRxx, this.fformRxx)
      .filter(combo => combo[0] && combo[1])
      .first()
      .subscribe(combo => {
        const vdvForm = combo[0];
        const fform = combo[1];
        this.vdvForm = vdvForm;

        /* set rvAfterFD */
        const rvCal_ = Observable.merge(
          this.vdvForm.get('vehicle.residualValueBeforeFD').valueChanges,
          this.fform.get('feesAndDeductions').valueChanges)
          .startWith(null)
          .subscribe(() => {
            const residualValueBeforeFD = this.vdvForm.get('vehicle.residualValueBeforeFD').value;
            let feesAndDeductions = 0;
            (this.fform.get('feesAndDeductions') as FormArray).controls.forEach(ctrl => {
              feesAndDeductions += ctrl.get('amount').value;
            });
            this.rvAfterFD = residualValueBeforeFD - feesAndDeductions;
          });
        this.subscriptions.push(rvCal_);
      });



    const fds = this.vehicle.feesAndDeductions.map(fd => this.fb.group({
      fooBar: '', // when all the ctrls are disabled, the form.valid is always false
      type: [{value: this.fu.idToName(fd.type, this.btity.types['feesAndDeductionsTypes']), disabled: true}],
      part: [
        {value: this.fu.idToName(fd.part, this.btity.types['parts']), disabled: true},
        [this.sv.notListedButCanBeEmpty(this.btity.types['parts'].map(p => p.name))]
      ],
      details: [{value: fd.details, disabled: true}],
      amount: [{value: fd.amount, disabled: true}, [Validators.required]]
    }));

    this.fdFormArray = this.fb.array(fds);

    this.fform = this.fb.group({
      feesAndDeductions: this.fdFormArray,
    });

    this.fformRxx.next(this.fform);
    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        if (this.fform.valid) {
          const allV = this.fform.getRawValue();
          allV['feesAndDeductions'].forEach(item => {
            delete item.fooBar;
            item.type = this.fu.nameToId(item.type, this.btity.types['feesAndDeductionsTypes']);
            item.part = this.fu.nameToId(item.part, this.btity.types['parts']);
          });
          return allV;
        }
      });

  }

  openDialogNewFD() {
    const dialogRef = this.dialog.open(DialogNewFdComponent, {
      data: {btity: this.btity},
    });
    dialogRef.afterClosed().subscribe((newFDForm: FormGroup) => {
      // console.log(newFDForm);
      if (newFDForm) {
        (this.fform.get('feesAndDeductions') as FormArray).push(newFDForm);
        this.fform.markAsTouched();
        this.fform.markAsDirty();
      }
    });

  }

  onYesNoClose(event, index) {
    if (event) {
      (this.fform.get('feesAndDeductions') as FormArray).removeAt(index);
      this.fform.markAsTouched();
      this.fform.markAsDirty();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}

