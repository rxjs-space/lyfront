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


@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  valueChangesRx: Observable<any>;
  @Output() saved = new EventEmitter();
  @Output() isChangedAndValid = new EventEmitter();
  @Input() saveTriggerRxx: any;
  vehicleForm: FormGroup;
  isNew = false;
  @Input() vehicle: any;
  @Input() btity: any;
  @ViewChild(VehicleDetailsGeneralComponent) dGeneral: any;
  @ViewChild(VehicleDetailsStatusComponent) dStatus: any;
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
  }

  ngAfterViewInit() {
    const partialFormContainers = ['dGeneral', 'dStatus'];
    const rxArray = partialFormContainers.map(name => {
      return this[name].valueChangesRx;
    });
    this.valueChangesRx = Observable.combineLatest(rxArray)
      .filter(v => {// filter out those like [null, null, ...]
        let hasChanges = false;
        for (const item of v) {
          if (v) {
            hasChanges = true;
            break;
          }
        }
        return hasChanges;
      });
    const sub0_ = Observable.combineLatest(this.valueChangesRx, this.asyncMon.init('validatorDuplicateVIN'))
      .filter(combo => { // check if asyncValidator is working
        console.log('combo1done', combo[1]['done'])
        if (!combo[1]['done']) {this.isChangedAndValid.emit(false); }
        return combo[1]['done'];
      })
      .delay(0) // after async validator is done, wait for one cycle and continue
      .filter(v => { // check if all partial forms are valid
        let allValid = true;
        for (const name of partialFormContainers) {
          if (!this[name].fform.valid) {allValid = false; break;}
        }
        if (!allValid) {
          this.isChangedAndValid.emit(false); // if invalid, mark
        }
        return allValid;
      })
      .subscribe(this.checkIfChanged.bind(this));

    this.subscriptions.push(sub0_);

    const sub1_ = this.saveTriggerRxx.subscribe(() => {
      this.save();
    });
    this.subscriptions.push(sub1_);

    // this.isValidIsChangedCombo.isValid = this.dGeneral.fform.valid && this.dStatus.fform.valid;
  }

  checkIfChanged(dataThatMayHaveChangedArray) {
    // console.log(dataThatMayHaveChangedArray);
    this.patches = [];
    this.newVehicle = Object.assign({}, this.vehicle, ...dataThatMayHaveChangedArray);
    this.patches = jsonpatch.compare(this.vehicle, this.newVehicle);
    // this.isValidIsChangedCombo.isChanged = !!this.patches.length;
    this.isChangedAndValid.emit(!!this.patches[length]);
  }

  save() {
    console.log('saving...');
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
            if (r.error) {
              console.log(r.error);
            } else {
              console.log('updated');
              this.saved.emit(r);
            }
          });
        break;
    }

  // saveVehicle(event) {
  //   if (event.isNew) {
  //     return this.data.insertVehicle(event.data)
  //       .catch(err => Observable.of(err))
  //       .subscribe(r => {
  //         if (r.ok === false) {
  //           // show some error dialog
  //           return console.log(r);
  //         }
  //         console.log(r.insertedIds[0]);
  //         // this.zipData.vehicle = r;
  //         this.router.navigateByUrl('/vehicles/' + event.data.vin);
  //       });
  //   } else {
  //     return this.data.updateVehicle(event.data.vin, event.data)
  //       .subscribe(r => {
  //         if (r.ok) {
  //           this.router.navigateByUrl('/vehicles/' + event.data.vin);
  //           console.log('updated');

  //         } else {
  //           console.log('something wrong');
  //           console.log(r);
  //         }
  //       });
  //   }

  // }


  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}
