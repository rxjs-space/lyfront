import { AfterViewInit, Component, EventEmitter, OnInit, OnChanges, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import jsonpatch from 'fast-json-patch';

import { DataService } from '../../data/data.service';
import { AuthService } from '../../auth/auth.service';

import { SharedValidatorsService } from '../validators/shared-validators.service';
import { AsyncMonitorService } from '../async-monitor/async-monitor.service';
import { EventListenersService } from '../event-listeners/event-listeners.service';

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
  isMofcomRegisterTypeSpecifiedRxx = new BehaviorSubject('');
  @Output() isChangedAndValid = new EventEmitter();
  @Input() saveTriggerRxx: any;
  @Input() checkValidityTriggerRxx: any;
  vehicleForm: FormGroup;
  isNew = false;
  @Input() vehicle: any;
  @Input() btity: any;
  @Input() isInPrintMode: boolean;
  @ViewChild(VehicleDetailsGeneralComponent) dGeneral: any;
  @ViewChild(VehicleDetailsStatusComponent) dStatus: any;
  @ViewChild(VehicleDetailsVehicleComponent) dVehicle: any;
  @ViewChild(VehicleDetailsOwnerAgentComponent) dOwnerAgent: any;
  @ViewChild(VehicleDetailsDocsProvidedComponent) dDocsProvided: any;
  @ViewChild(VehicleDetailsFeesAndDeductionsComponent) dFND: any;
  @ViewChild(VehicleDetailsNotesComponent) dNotes: any;
  @ViewChild(VehicleDetailsCostsComponent) dCosts: any;
  @Input() checkMofcomValidityRxx: any;
  partialFormContainers = [
    'dGeneral', 'dStatus', 'dVehicle',
    'dOwnerAgent', 'dDocsProvided', 'dFND',
    'dNotes', 'dCosts'];
  patches = [];
  newVehicle: {[key: string]: any} = {};
  subscriptions: Subscription[] = [];
  asyncMonitorId_InsertUpdateVehicle = 'insertUpdateVehicle';
  asyncMonitorHolder_InsertUpdateVehicle: any;
  eventListenerTitles = ['Survey2ReadyComponent', 'DismantlingHomeComponent', 'Survey2Ready2Component'];
  eventTellerRxx = new Subject();
  constructor(
    private auth: AuthService,
    private data: DataService,
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private router: Router,
    private asyncMon: AsyncMonitorService,
    private el: EventListenersService
  ) { }

  ngOnInit() {
    this.isNew = !this.vehicle.vin;
    const sub0_ = Observable.combineLatest(this.isChangedRxx, this.isValidRxx)
      .subscribe(combo => {
        // console.log(combo);
        if (combo[0] && combo[1]) {
          this.isChangedAndValid.emit(true);
        } else {
          this.isChangedAndValid.emit(false);
        }
      });

    this.subscriptions.push(sub0_);
    this.asyncMonitorHolder_InsertUpdateVehicle = this.asyncMon.init(this.asyncMonitorId_InsertUpdateVehicle);
    this.subscribeListenersToTeller();
  }

  subscribeListenersToTeller() {
    this.eventListenerTitles.forEach(t => {
      const listener = this.el.getListener(t);
      if (listener) {
        const sub_ = this.eventTellerRxx.subscribe(listener);
        this.subscriptions.push(sub_);
      }
    });
  }

  ngAfterViewInit() {
    const rxArray = this.partialFormContainers.map(name => {
      return this[name].valueChangesRx;
    });
    this.valueChangesRx = Observable.combineLatest(rxArray)
      .delay(0)
      // .do(console.log);
      // .filter(v => {// emit value only when some partial form is dirty
      //   let someDirty = false;
      //   for (const name of this.partialFormContainers) {
      //     if (this[name].fform.dirty) {someDirty = true; break; }
      //   }
      //   // console.log('someDirty', someDirty);
      //   return someDirty;
      // });


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
    });

    // this.isValidIsChangedCombo.isValid = this.dGeneral.fform.valid && this.dStatus.fform.valid;
  }

  checkIfChanged(dataThatMayHaveChangedArray) {
    this.patches = [];
    const oldVehicle = JSON.parse(JSON.stringify(this.vehicle)); // is this necessary?
    this.newVehicle = Object.assign({}, oldVehicle, ...dataThatMayHaveChangedArray);
    // console.log(oldVehicle);
    // console.log(this.newVehicle);
    delete this.newVehicle.vinConfirm;
    // console.log(this.newVehicle.mofcomRegisterType);
    this.isMofcomRegisterTypeSpecifiedRxx.next(this.newVehicle.mofcomRegisterType);
    this.patches = jsonpatch.compare(oldVehicle, this.newVehicle);
    // console.log(this.patches);
    // this.isChangedAndValid.emit(!!this.patches[length]);
    this.isChangedRxx.next(!!this.patches[length]);
    this.checkValidity.bind(this)();
  }

  checkValidity() {
    const markAllAsTouched = (control: AbstractControl) => {
      if (control.hasOwnProperty('controls')) {
        control.markAsTouched(); // mark group
        const ctrl = <any>control;
        for (const innerId in ctrl.controls) {
          markAllAsTouched(ctrl.controls[innerId] as AbstractControl);
        }
      } else {
        (<FormControl>(control)).markAsTouched();  // mark single control
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

  editVtbmymBasedOnIsDismantlingReady(patches, vehicle?) { // to delete
    const patchesCopy = JSON.parse(JSON.stringify(patches));
    const itemToCheck = ['isDismantlingReady'];
    const isReadyOpByCurrentUser = patchesCopy.find(p => p.path === `/status2/${itemToCheck}`);
    let vehicleCopy;
    if (isReadyOpByCurrentUser && isReadyOpByCurrentUser.value && !this.vehicle.vtbmym) {
      // /status2/iDismantlingReady === true, the brand/model/year/month must be filled
      const vtbmymOp = {
        op: 'replace',
        path: '/vtbmym',
        value: 'new'
      };
      patchesCopy.push(vtbmymOp);
      if (vehicle) {
        vehicleCopy = JSON.parse(JSON.stringify(vehicle));
        vehicleCopy.vtbmym = 'new';
      }
      return {patches: patchesCopy, vehicle: vehicleCopy};
    } else {
      // there will be no op for vtbmym
      return {patches, vehicle};
    }

  }

  // addsVtbmymOp(patches, vehicle) {
  //   const patchesCopy = JSON.parse(JSON.stringify(patches));
  //   const vtbmymOp = {
  //     op: 'replace',
  //     path: '/vtbmym',
  //     value: 'new'
  //   };
  //   patchesCopy.push(vtbmymOp);

  //   let vehicleCopy = JSON.parse(JSON.stringify(vehicle));
  //   vehicleCopy.vtbmym = 'new';

  //   return {patches: patchesCopy, vehicle: vehicleCopy};
  // }

  editIsNotReadyTill(patches) { // for new vehicle only
    const patchesCopy = JSON.parse(JSON.stringify(patches));
    const itemsToCheck = ['isSurveyReady', 'isDismantlingReady'];
    const tillHashes = {
      'isSurveyReady': 'isSurveyNotReadyTill',
      'isDismantlingReady': 'isDismantlingNotReadyTill'
    };
    itemsToCheck.forEach(item => {
      const isReadyOpByCurrentUser = patchesCopy.find(p => p.path === `/status2/${item}`);
      if (isReadyOpByCurrentUser && isReadyOpByCurrentUser.value) {
          const today = new Date();
          const notReadyTillOp = {
            op: 'replace',
            path: `/status2/${tillHashes[item]}`,
            value: today
          };
          patchesCopy.push(notReadyTillOp);
      }
    });
    return patchesCopy;
  }

  editNoteBasedOnReadiness(patches) { // for old vehicle only and feature including editIsnotReadyTill
    const patchesCopy = JSON.parse(JSON.stringify(patches));
    const itemsToCheck = ['isSurveyReady', 'isDismantlingReady'];
    const itemDisplayNameHashes = {
      'isSurveyReady': '验车',
      'isDismantlingReady': '拆解'
    };
    const sinceHashes = {
      'isSurveyReady': 'isSurveyNotReadySince',
      'isDismantlingReady': 'isDismantlingNotReadySince'
    };
    const tillHashes = {
      'isSurveyReady': 'isSurveyNotReadyTill',
      'isDismantlingReady': 'isDismantlingNotReadyTill'
    };
    const reasonHashes = {
      'isSurveyReady': 'isSurveyNotReadyReason',
      'isDismantlingReady': 'isDismantlingNotReadyReason'
    };
    itemsToCheck.forEach(item => {
      const isReadyOpByCurrentUser = patchesCopy.find(p => p.path === `/status2/${item}`);
      if (isReadyOpByCurrentUser && isReadyOpByCurrentUser.value) {
          const deleteReasonOp = {
            op: 'replace',
            path: `/status2/${reasonHashes[item]}`,
            value: ''
          };


          const reason = this.vehicle.status2[reasonHashes[item]];
          const noteLength = this.dNotes.fform.get('remarks').length;
          const userId = this.auth.getUserId();
          const userDisplayName = this.auth.getUserDisplayName();
          const notReadySinceDate = this.vehicle.status2[sinceHashes[item]];
          const today = new Date();
          const todayDate = (today).toISOString().substring(0, 10);
          const itemDisplayName = itemDisplayNameHashes[item];

          const notReadyTillOp = {
            op: 'replace',
            path: `/status2/${tillHashes[item]}`,
            value: today
          };

          const noteOp = {
            op: 'add',
            path: `/remarks/${noteLength}`,
            value: {
              by: userId,
              byDisplayName: userDisplayName,
              content: `${itemDisplayName}暂缓解除。暂缓期：${notReadySinceDate} 至 ${todayDate}，暂缓原因：${reason}`,
              date: todayDate
            }
          };
          patchesCopy.push(deleteReasonOp, notReadyTillOp, noteOp);
          // return patchesCopy;
      }
    });


// let noteLength, userId, userDisplayName, whoNotReady, isNotReadySince, isNotReadyTill, isNotReadyReason, noteDate;

// const noteOp = {
//   op: "add",
//   path: `/remarks/${noteLength}`,
//   value: {
//     by: userId,
//     byDisplayName: userDisplayName,
//     content: `${whoNotReady}暂缓，从${isNotReadySince}到${isNotReadyTill}，原因：${isNotReadyReason}`,
//     date: noteDate
//   }
// }


    return patchesCopy;
  }

  save() {
    this.isSavingRxx.next(true);
    console.log('saving...');
    console.log(this.patches);
    this.asyncMonitorHolder_InsertUpdateVehicle.next({
      done: false, value: null
    });

    switch (this.isNew) {
      case true:
        const combo = this.editVtbmymBasedOnIsDismantlingReady(this.editIsNotReadyTill(this.patches), this.newVehicle);
        this.data.insertVehicle({
          vehicle: combo.vehicle,
          patches: combo.patches
        }).first()
          .catch(error => Observable.of({
            ok: false, error
          }))
          .subscribe(r => {
            this.isSavingRxx.next(false);
            this.asyncMonitorHolder_InsertUpdateVehicle.next({
              done: true, value: r, error: r.error
            });
            if (r.error) {
              console.log(r.error);
            } else {
              console.log('inserted new', r.insertedIds[0]);
              this.saved.emit({vin: this.newVehicle['vin']});
              this.eventTellerRxx.next({
                message: `new vehicle inserted`,
                vin: this.newVehicle['vin']
              });
            }
          });
        break;
      case false:
        const patchesToSend = this.editVtbmymBasedOnIsDismantlingReady(this.editNoteBasedOnReadiness(this.patches))['patches'];
        console.log(patchesToSend);
        this.data.updateVehicle(this.vehicle.vin, {
            patches: patchesToSend
          })
          .first()
          .catch(error => Observable.of({
            ok: false, error
          }))
          .subscribe(r => {
            this.isSavingRxx.next(false);
            this.asyncMonitorHolder_InsertUpdateVehicle.next({
              done: true, value: r, error: r.error
            });
            if (r.error) {
              console.log(r.error);
            } else {
              console.log('updated');
              this.saved.emit(r);
              this.eventTellerRxx.next({
                message: `vehicle updated.`,
                patches: patchesToSend
              });
            }
          });
        break;
    }


  }

  ngOnDestroy() {
    for (const name of this.partialFormContainers) {
      this[name].fform.reset();
    }

    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}
