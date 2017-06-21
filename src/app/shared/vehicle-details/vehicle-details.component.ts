import { AfterViewInit, Component, EventEmitter, OnInit, OnChanges, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import jsonpatch from 'fast-json-patch';

import { DataService } from '../../data/data.service';

import { SharedValidatorsService } from '../validators/shared-validators.service';
import { AsyncMonitorService } from '../async-monitor/async-monitor.service';

import { VehicleDetailsGeneralComponent } from './vehicle-details-general/vehicle-details-general.component';
import { VehicleDetailsStatusComponent } from './vehicle-details-status/vehicle-details-status.component';
import { VehicleDetailsVehicleComponent } from './vehicle-details-vehicle/vehicle-details-vehicle.component';
import { VehicleDetailsOwnerAgentComponent } from './vehicle-details-owner-agent/vehicle-details-owner-agent.component';
import { VehicleDetailsDocsProvidedComponent } from './vehicle-details-docs-provided/vehicle-details-docs-provided.component';
import { VehicleDetailsFeesAndDeductionsComponent } from './vehicle-details-fees-and-deductions/vehicle-details-fees-and-deductions.component';
import { VehicleDetailsNotesComponent } from './vehicle-details-notes/vehicle-details-notes.component';
import { VehicleDetailsCostsComponent } from './vehicle-details-costs/vehicle-details-costs.component';


@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  valueChangesRx: Observable<any>;
  @Output() saved = new EventEmitter();
  isSavingRxx = new BehaviorSubject(false);
  isChangedRxx = new BehaviorSubject(false);
  isValidRxx = new BehaviorSubject(false);
  @Output() isChangedAndValid = new EventEmitter();
  @Input() saveTriggerRxx: any;
  @Input() checkValidityTriggerRxx: any;
  vehicleForm: FormGroup;
  isNew = false;
  @Input() vehicle: any;
  @Input() btity: any;
  @ViewChild(VehicleDetailsGeneralComponent) dGeneral: any;
  @ViewChild(VehicleDetailsStatusComponent) dStatus: any;
  @ViewChild(VehicleDetailsVehicleComponent) dVehicle: any;
  @ViewChild(VehicleDetailsOwnerAgentComponent) dOwnerAgent: any;
  @ViewChild(VehicleDetailsDocsProvidedComponent) dDocsProvided: any;
  @ViewChild(VehicleDetailsFeesAndDeductionsComponent) dFND: any;
  @ViewChild(VehicleDetailsNotesComponent) dNotes: any;
  @ViewChild(VehicleDetailsCostsComponent) dCosts: any;
  partialFormContainers = [
    'dGeneral', 'dStatus', 'dVehicle',
    'dOwnerAgent', 'dDocsProvided', 'dFND',
    'dNotes', 'dCosts'];
  patches = [];
  newVehicle = {};
  subscriptions: Subscription[] = [];
  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private router: Router,
    private asyncMon: AsyncMonitorService
  ) { }

  ngOnInit() {
    this.isNew = !this.vehicle.vin;
    Observable.combineLatest(this.isChangedRxx, this.isValidRxx)
      .subscribe(combo => {
        // console.log(combo);
        if (combo[0] && combo[1]) {
          this.isChangedAndValid.emit(true);
        } else {
          this.isChangedAndValid.emit(false);
        }
      })
  }

  ngAfterViewInit() {
    const rxArray = this.partialFormContainers.map(name => {
      return this[name].valueChangesRx;
    });
    this.valueChangesRx = Observable.combineLatest(rxArray)
      .filter(v => {// emit value only when some partial form is dirty
        let someDirty = false;
        for (const name of this.partialFormContainers) {
          if (this[name].fform.dirty) {someDirty = true; break; }
        }
        // console.log('someDirty', someDirty);
        return someDirty;
      });


    /**
     * monitor the async validator and set the this.isValidRxx
     */
    const sub10_ = this.asyncMon.init('validatorDuplicateVIN')
      .delay(0)
      .subscribe(result => {
        if (result.done) {
          if (!result.value) {
            this.isValidRxx.next(false);
          } else { // if async validator finishes with true, check others
            this.checkValidity.bind(this)();
          }
        } else {
          this.isValidRxx.next(false);
        }
      });

    this.subscriptions.push(sub10_);

    const sub11_ = this.valueChangesRx
      .subscribe(this.checkIfChanged.bind(this));

    this.subscriptions.push(sub11_);

    // const sub0_ = Observable.combineLatest(this.valueChangesRx, this.asyncMon.init('validatorDuplicateVIN'))
    //   .filter(combo => { // check if asyncValidator is working
    //     console.log('combo1done', combo[1]['done']);
    //     if (!combo[1]['done']) {this.isChangedAndValid.emit(false); }
    //     return combo[1]['done'];
    //   })
    //   .delay(0) // after async validator is done, wait for one cycle and continue
    //   .filter(v => { // check if all partial forms are valid
    //     let allValid = true;
    //     for (const name of this.partialFormContainers) {
    //       if (!this[name].fform.valid) {allValid = false; break; }
    //     }
    //     if (!allValid) {
    //       this.isChangedAndValid.emit(false); // if invalid, mark
    //     }
    //     console.log('allValid', allValid);
    //     return allValid;
    //   })
    //   .map(combo => combo[0]) // remove the asyncValidator status
    //   .subscribe(this.checkIfChanged.bind(this));

    // this.subscriptions.push(sub0_);

    const sub1_ = this.saveTriggerRxx.subscribe(() => {
      this.save();
    });
    this.subscriptions.push(sub1_);
    const sub2_ = this.checkValidityTriggerRxx.subscribe(() => {
      this.checkValidity();
    })

    // this.isValidIsChangedCombo.isValid = this.dGeneral.fform.valid && this.dStatus.fform.valid;
  }

  checkIfChanged(dataThatMayHaveChangedArray) {
    this.patches = [];
    const oldVehicle = JSON.parse(JSON.stringify(this.vehicle)); // is this necessary?
    this.newVehicle = Object.assign({}, oldVehicle, ...dataThatMayHaveChangedArray);
    this.patches = jsonpatch.compare(oldVehicle, this.newVehicle);
    // this.isChangedAndValid.emit(!!this.patches[length]);
    // console.log(this.patches);
    this.isChangedRxx.next(!!this.patches[length]);
    this.checkValidity.bind(this)();
  }

  checkValidity() {
    const markAllAsTouched = (control: AbstractControl) => {
      if (control.hasOwnProperty('controls')) {
        control.markAsTouched(true); // mark group
        const ctrl = <any>control;
        for (const innerId in ctrl.controls) {
          markAllAsTouched(ctrl.controls[innerId] as AbstractControl);
        }
      } else {
        (<FormControl>(control)).markAsTouched(true);  // mark single control
      }
    };

    this.partialFormContainers.forEach(name => {
      markAllAsTouched(this[name].fform);
    });

    let allValid = true;
    for (const name of this.partialFormContainers) {
      if (!this[name].fform.valid) {allValid = false; break; }
    }
    this.isValidRxx.next(allValid);

  }
  save() {
    this.isSavingRxx.next(true);
    console.log('saving...');
    console.log(this.patches);
    switch (this.isNew) {
      case true:
        this.data.insertVehicle({
          vehicle: this.newVehicle,
          patches: this.patches
        }).first()
          .catch(error => Observable.of({
            ok: false, error
          }))
          .subscribe(r => {
            this.isSavingRxx.next(false);
            if (r.error) {
              console.log(r.error);
            } else {
              console.log('inserted new', r.insertedIds[0]);
              this.saved.emit({vin: this.newVehicle['vin']});
            }
          });
        break;
      case false:
        this.data.updateVehicle(this.vehicle.vin, {patches: this.patches})
          .first()
          .catch(error => Observable.of({
            ok: false, error
          }))
          .subscribe(r => {
            this.isSavingRxx.next(false);
            if (r.error) {
              console.log(r.error);
            } else {
              console.log('updated');
              this.saved.emit(r);
            }
          });
        break;
    }


  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}
