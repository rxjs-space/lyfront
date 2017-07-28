import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-vehicle-details-status',
  templateUrl: './vehicle-details-status.component.html',
  styleUrls: ['./vehicle-details-status.component.scss']
})
export class VehicleDetailsStatusComponent implements OnInit {
  valueChangesRx: Observable<any>;
  isCollapsed = true;
  fform: FormGroup;
  @Input() vehicle: any;
  @Input() btity: any;
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }

  ngOnInit() {
    this.fform = this.fb.group({
      status: this.fb.group({
        ownerDocsReady: this.fb.group({
          done: [this.fu.disableIfDone(this.vehicle.status.ownerDocsReady.done)],
          date: [this.vehicle.status.ownerDocsReady.date]
        }),
        platesCollectedByOwner: this.fb.group({
          done: [this.fu.disableIfDone(this.vehicle.status.platesCollectedByOwner.done)],
          date: [this.vehicle.status.platesCollectedByOwner.date]
        }),
        rubbing: this.fb.group({
          done: [this.fu.disableIfDone(this.vehicle.status.rubbing.done)],
          date: [this.vehicle.status.rubbing.date]
        }),
        photosOnEntrance: this.fb.group({
          done: [this.fu.disableIfDone(this.vehicle.status.photosOnEntrance.done)],
          date: [this.vehicle.status.photosOnEntrance.date]
        }),
        photosAfterCuttingUp: this.fb.group({
          done: [this.fu.disableIfDone(this.vehicle.status.photosAfterCuttingUp.done)],
          date: [this.vehicle.status.photosAfterCuttingUp.date]
        }),
        policeSiteEntry: this.fb.group({
          done: [this.fu.disableIfDone(this.vehicle.status.policeSiteEntry.done)],
          date: [this.vehicle.status.policeSiteEntry.date]
        }),
        mofcomEntry: this.fb.group({
          done: [this.fu.disableIfDone(this.vehicle.status.mofcomEntry.done)],
          date: [this.vehicle.status.mofcomEntry.date]
        }),
        mofcomCertReady: this.fb.group({
          done: [this.fu.disableIfDone(this.vehicle.status.mofcomCertReady.done)],
          date: [this.vehicle.status.mofcomCertReady.date],
        }),
        mofcomCertCollectedByOwnerAndSigned: this.fb.group({
          done: [this.fu.disableIfDone(this.vehicle.status.mofcomCertCollectedByOwnerAndSigned.done)],
          date: [this.vehicle.status.mofcomCertCollectedByOwnerAndSigned.date],
        }),
        firstSurvey: this.fb.group({
          done: [{value: this.vehicle.status.firstSurvey.done, disabled: true}],
          date: [this.vehicle.status.firstSurvey.date],
        }),
        secondSurvey: this.fb.group({
          done: [{value: this.vehicle.status.secondSurvey.done, disabled: true}],
          date: [this.vehicle.status.secondSurvey.date],
        }),
        dismantled: this.fb.group({
          done: [{value: this.vehicle.status.dismantled.done, disabled: true}],
          date: [this.vehicle.status.dismantled.date],
        }),
        sold: this.fb.group({
          done: [{value: this.vehicle.status.sold.done, disabled: true}],
          date: [this.vehicle.status.sold.date],
        }),
        // preDismantling: this.fb.group({
        //   done: [{value: this.vehicle.status.preDismantling.done, disabled: true}],
        //   date: [this.vehicle.status.preDismantling.date],
        // }),
      })
    });

    /* disable the control if status.done */
    const statusObj = this.vehicle.status;

    Object.keys(statusObj).forEach(k => {
      if (statusObj[k].done) {
        const ctrl = (this.fform.get(`status.${k}.done`) as FormControl);
        // console.log(ctrl.value);
        ctrl.disable();
      }
    });

    /* watching status and setup date*/
    Object.keys(statusObj).forEach(k => {
      // if (!statusObj[k].hasOwnProperty('done')) {return; }
      this.fform.get(`status.${k}.done`).valueChanges
        .subscribe(v => {
          const dateCtrl = this.fform.get(`status.${k}.date`);
          if (v && !dateCtrl.value) {
            this.fform.get(`status.${k}.date`).setValue((new Date()).toISOString().slice(0, 10));
          }
          if (!v && dateCtrl.value) {
            this.fform.get(`status.${k}.date`).setValue('');
          }
        });
    });


    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        // if (this.fform.valid) {
          const allV = this.fform.getRawValue();
          return allV;
        // }
      });
  }

}
