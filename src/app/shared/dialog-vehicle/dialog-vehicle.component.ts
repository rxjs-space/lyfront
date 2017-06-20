import { Component, ViewChild, HostBinding, Inject, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { DataService } from '../../data/data.service';
import { Vehicle } from '../../data/vehicle';
import { AsyncDataLoaderService } from '../async-data-loader/async-data-loader.service';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';


@Component({
  selector: 'app-dialog-vehicle',
  templateUrl: './dialog-vehicle.component.html',
  styleUrls: ['./dialog-vehicle.component.scss'],
})
export class DialogVehicleComponent implements OnInit, OnDestroy {
  isInPrintMode = false;
  vehicleRxx: any;
  btityRxx: any;
  asyncDataId = 'dialogVehicleComponent' + Math.random();
  saveRxx = new Subject();
  checkValidityTriggerRxx = new Subject();
  @ViewChild(VehicleDetailsComponent) vDetails;
  isValidAndChanged = false;
  itemRxHash = {
    btity: this.data.btityRxx,
    vehicle: this.dataFromTrigger.vin ? this.data.getVehicleByVIN(this.dataFromTrigger.vin) : Observable.of(new Vehicle())
  }
  isLoadedWithoutErrorRxx: any;
  isWithErrorRxx: any;
  holder: any;

  elementHash = {};

  constructor(
    public asyncDataLoader: AsyncDataLoaderService,
    private data: DataService,
    public dialogRef: MdDialogRef<DialogVehicleComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
  ) { }

  ngOnInit() {
    // console.log(this.dataFromTrigger);

    this.holder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
    this.isLoadedWithoutErrorRxx = this.holder.isLoadedWithoutErrorRxx;
    this.isWithErrorRxx = this.holder.isWithErrorRxx;
    this.vehicleRxx = this.holder.latestResultRxxHash['vehicle'];
    this.btityRxx = this.holder.latestResultRxxHash['btity'];
    this.holder.refreshAll();
  }

  onIsChangedAndValid(event) {
    this.isValidAndChanged = event;
  }

  onSaved(event) {
    if (event.vin) {
      this.itemRxHash.vehicle = this.data.getVehicleByVIN(event.vin);
    }
    this.holder.refreshByTitle('vehicle');
  }

  /**
   * 1) set <dialog-container>'s overflow to visible, visibility to visible
   * 2) set <html>'s position to initial, visibility to hidden
   * 3) set <overlay-container>'s position to initial
   */
  preparePrint() {
    console.log('preparing to print');
    this.elementHash['htmlElement'] = document.querySelector('html');
    this.elementHash['htmlElement'].classList.add('prepare-print-html');
    this.elementHash['dialogVehicleElement'] = document.querySelector('app-dialog-vehicle');
    this.elementHash['dialogContainerElement'] = this.elementHash['dialogVehicleElement'].parentElement;
    this.elementHash['dialogContainerElement'].classList.add('prepare-print-dialog-container')
    this.elementHash['overlayContainerElement'] = document.querySelector('.cdk-overlay-container');
    this.elementHash['overlayContainerElement'].classList.add('prepare-print-overlay-container')
    this.elementHash['dialogContentElement'] = document.querySelector('[md-dialog-content]');
    this.elementHash['dialogContentElement'].classList.add('prepare-print-dialog-content');
    this.isInPrintMode = true;
  }

  rollbackPreparePrint() {
    if (this.isInPrintMode) {
      this.elementHash['htmlElement'].classList.remove('prepare-print-html');
      this.elementHash['dialogContainerElement'].classList.remove('prepare-print-dialog-container')
      this.elementHash['overlayContainerElement'].classList.remove('prepare-print-overlay-container');
      this.elementHash['dialogContentElement'].classList.remove('prepare-print-dialog-content');
      this.isInPrintMode = false;
    }
  }

  ngOnDestroy() {
    this.rollbackPreparePrint();
    this.asyncDataLoader.destroy(this.asyncDataId);
  }

}
