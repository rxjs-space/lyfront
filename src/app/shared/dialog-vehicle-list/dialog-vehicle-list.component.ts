import { Component, Inject, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { DataService } from '../../data/data.service';
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';
import { AsyncMonitorService } from '../async-monitor/async-monitor.service';


@Component({
  selector: 'app-dialog-vehicle-list',
  templateUrl: './dialog-vehicle-list.component.html',
  styleUrls: ['./dialog-vehicle-list.component.scss']
})
export class DialogVehicleListComponent implements OnInit, AfterViewInit, OnDestroy {
  hasSelected = false;
  selectAllRxx = new BehaviorSubject(null);
  formUIStatus: FormGroup;
  @ViewChild(VehicleListComponent) vehicleList: VehicleListComponent;
  subscriptions: Subscription[] = [];
  selectedVehicleList = [];
  isUpdating = false;
  itemsToExclude = []; // when selectAll, the itemsToExclude will be ignored

  actionTriggerRxx = new BehaviorSubject(false);
  actionResultRxx = new BehaviorSubject(null);
  asyncMonitorId = 'dialogVehicleList';
  asyncMonitorHolder: any;

  elementHash = {};
  isInPrintMode = false;

  constructor(
    private asyncMonitor: AsyncMonitorService,
    private data: DataService,
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<DialogVehicleListComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
  ) { }

  ngOnInit() {
    this.asyncMonitorHolder = this.asyncMonitor.init(this.asyncMonitorId);
    this.formUIStatus = this.fb.group({
      canCheckFirstSurvey: false
    });
    // console.log(this.dataFromTrigger);
  }

  ngAfterViewInit() {
    const sub0_ = this.vehicleList.formSelectedVehicleListValueChangesRxx
      .debounceTime(10) // ignore changes during 'selectAll' ops
      .filter(v => v) // ignore null value
      .map(formValue => formValue.vehicleList)
      .subscribe(vehicleListWithSelection => {
        this.hasSelected = false;
        for (let i = 0; i < vehicleListWithSelection.length; i++) {
          if (vehicleListWithSelection[i].selected) {
            this.hasSelected = true;
            this.selectedVehicleList = vehicleListWithSelection.filter(item => item.selected).map(item => item.vin);
            break;
          }
        }
      });

    this.subscriptions.push(sub0_);


    const sub1_ = (this.actionTriggerRxx as Observable<boolean>)
      .filter(actionParams => actionParams)
      .subscribe(actionParams => {
        const surveyType: string = actionParams[0];
        const vehicleList: string[] = this.selectedVehicleList;
        this.handleVehiclesSurveyStatus(surveyType, vehicleList);
      });

  }

  ngOnDestroy() {
    this.rollbackPreparePrint();
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

  handleVehiclesSurveyStatus(surveyType, vehicleList) {
    this.isUpdating = true;
    this.asyncMonitorHolder.next({
      done: false,
      value: null,
      error: null
    });
    this.data.vehiclesSurveyStatus(surveyType, vehicleList)
      .catch(error => Observable.of({
        ok: false, error
      }))
      .subscribe(result => {
        this.actionResultRxx.next(result);
        this.asyncMonitorHolder.next({
          done: true,
          value: result.error ? null : result,
          error: result.error ? result.error : null
        });

        if (!result.error) {
          const vehicleListFromDB = this.vehicleList.vehicleList1;
          vehicleList.forEach(vin => {
            const vehicleIndex = vehicleListFromDB.map(v => v.vin).indexOf(vin);
            const vehicle = vehicleListFromDB[vehicleIndex];
            vehicle.status[surveyType].done = true;
            if (+vehicle.vehicleType === 3 && surveyType !== 'secondSurvey') {
              vehicle.status['secondSurvey'].done = true;
            }
            // console.log(vehicle);
            // replace vehicle, so the view of vehicleListComponent will update
            vehicleListFromDB[vehicleIndex] = Object.assign({}, vehicle);
            const checkBoxCtrl = this.vehicleList.formSelectedVehicleList.get(['vehicleList', vehicleIndex, 'selected']);
            checkBoxCtrl.setValue(false);
            checkBoxCtrl.disable();
            this.itemsToExclude.push(vehicleIndex);

          });

          // console.log(result);
        }
        // if (result.error) {
        //   console.log('Something went wrong at handleVehiclesSurveyStatus');
        //   console.log(result.error);
        // } else {
        //   console.log(result);
        // }
        this.isUpdating = false;
      });
  }


  preparePrint() {
    console.log('preparing to print');
    this.elementHash['htmlElement'] = document.querySelector('html');
    this.elementHash['htmlElement'].classList.add('prepare-print-html');

    this.elementHash['dialogVehicleListElement'] = document.querySelector('app-dialog-vehicle-list');
    this.elementHash['dialogContainerElement'] = this.elementHash['dialogVehicleListElement'].parentElement;
    this.elementHash['dialogContainerElement'].classList.add('prepare-print-dialog-container');
    
    this.elementHash['overlayContainerElement'] = document.querySelector('.cdk-overlay-container');
    this.elementHash['overlayContainerElement'].classList.add('prepare-print-overlay-container');
    this.elementHash['dialogContentElement'] = document.querySelector('[md-dialog-content]') || document.querySelector('md-dialog-content');
    this.elementHash['dialogContentElement'].classList.add('prepare-print-dialog-content');
    this.isInPrintMode = true;
  }

  rollbackPreparePrint() {
    if (this.isInPrintMode) {
      this.elementHash['htmlElement'].classList.remove('prepare-print-html');
      this.elementHash['dialogContainerElement'].classList.remove('prepare-print-dialog-container');
      this.elementHash['overlayContainerElement'].classList.remove('prepare-print-overlay-container');
      this.elementHash['dialogContentElement'].classList.remove('prepare-print-dialog-content');
      this.isInPrintMode = false;
    }
  }

}
