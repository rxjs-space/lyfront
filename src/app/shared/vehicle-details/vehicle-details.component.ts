import { Component, EventEmitter, OnInit, OnChanges, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';
import jsonpatch from 'fast-json-patch';

import { SharedValidatorsService } from '../validators/shared-validators.service';

import { VehicleDetailsGeneralComponent } from './vehicle-details-general/vehicle-details-general.component';


@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  vehicleForm: FormGroup;
  isNew = false;
  @Input() vehicle: any;
  @Input() btity: any;
  @ViewChild(VehicleDetailsGeneralComponent) dGeneral: any;
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
  ) { }

  ngOnInit() {
    this.isNew = !this.vehicle.vin;
    console.log(this.vehicle);
  }

}
