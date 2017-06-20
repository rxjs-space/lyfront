import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-vehicle-details-fees-and-deductions',
  templateUrl: './vehicle-details-fees-and-deductions.component.html',
  styleUrls: ['./vehicle-details-fees-and-deductions.component.scss']
})
export class VehicleDetailsFeesAndDeductionsComponent implements OnInit {
  valueChangesRx: Observable<any>;
  fform: FormGroup;
  @Input() vehicle: any;
  @Input() btity: any;
  @Input() vdvFormRxx: BehaviorSubject<FormGroup>;
  vdvForm: FormGroup;
  fdFormArray: FormArray;
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }
  ngOnInit() {
    this.vdvFormRxx
      .filter(vdvForm => !!vdvForm)
      .first()
      .subscribe(vdvForm => this.vdvForm = vdvForm)

    const fds = this.vehicle.feesAndDeductions.map(fd => this.fb.group({
      type: [{value: this.fu.idToName(fd.type, this.btity.types.feesAndDeductionsTypes), disabled: true}],
      part: [
        {value: this.fu.idToName(fd.part, this.btity.types.parts), disabled: true},
        [this.sv.notListedButCanBeEmpty(this.btity.types.parts.map(p => p.name))]
      ],
      details: [{value: fd.details, disabled: true}],
      amount: [{value: fd.amount, disabled: true}, [Validators.pattern(/^[0-9]+$/), Validators.required]]
    }));

    this.fdFormArray = this.fb.array(fds);

    this.fform = this.fb.group({
      feesAndDeductions: this.fdFormArray,
    });

  }

}

    // /* set rvAfterFD */
    // const rvCal_ = Observable.merge(
    //   this.vehicleForm.get('vehicle.residualValueBeforeFD').valueChanges, 
    //   this.vehicleForm.get('feesAndDeductions').valueChanges)
    //   .startWith(null)
    //   .subscribe(() => {
    //     const residualValueBeforeFD = this.vehicleForm.get('vehicle.residualValueBeforeFD').value;
    //     let feesAndDeductions = 0;
    //     (this.vehicleForm.get('feesAndDeductions') as FormArray).controls.forEach(ctrl => {
    //       feesAndDeductions += ctrl.get('amount').value;
    //     });
    //     this.rvAfterFDRxx.next(residualValueBeforeFD - feesAndDeductions);
    //   });