import { Component, ViewEncapsulation, HostBinding, Inject, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../../data/data.service';
import { AsyncDataLoaderService } from '../async-data-loader/async-data-loader.service';

@Component({
  selector: 'app-dialog-vehicle',
  templateUrl: './dialog-vehicle.component.html',
  styleUrls: ['./dialog-vehicle.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DialogVehicleComponent implements OnInit, OnDestroy {

  vehicleRxx: any;
  btityRxx: any;
  asyncDataId = 'dialogVehicleComponent' + Math.random();

  itemRxHash = {
    btity: this.data.btityRxx,
    vehicle: this.data.getVehicleByVIN(this.dataFromTrigger.vin)
  }
  isLoadedWithoutErrorRxx: any;
  isWithErrorRxx: any;
  holder: any;

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

  refV() {
    this.holder.refreshByTitle('vehicle');
  }

  /**
   * 1) set <dialog-container>'s overflow to visible, visibility to visible
   * 2) set <html>'s position to initial, visibility to hidden
   * 3) set <overlay-container>'s position to initial
   */
  preparePrint() {
    console.log('preparing to print');
    const htmlElement = document.querySelector('html');
    htmlElement.classList.add('prepare-print-html');
    const dialogVehicleElement = document.querySelector('app-dialog-vehicle');
    const dialogContainerElement = dialogVehicleElement.parentElement;
    dialogContainerElement.classList.add('prepare-print-dialog-container')
    const overlayContainerElement = document.querySelector('.cdk-overlay-container');
    overlayContainerElement.classList.add('prepare-print-overlay-container')
  }

  rollbackPreparePrint() {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.remove('prepare-print-html');
    const dialogVehicleElement = document.querySelector('app-dialog-vehicle');
    const dialogContainerElement = dialogVehicleElement.parentElement;
    dialogContainerElement.classList.remove('prepare-print-dialog-container')
    const overlayContainerElement = document.querySelector('.cdk-overlay-container');
    overlayContainerElement.classList.remove('prepare-print-overlay-container')
  }

  ngOnDestroy() {
    this.rollbackPreparePrint();
    this.asyncDataLoader.destroy(this.asyncDataId);
  }

}
