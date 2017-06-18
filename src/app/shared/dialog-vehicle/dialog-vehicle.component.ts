import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../../data/data.service';
import { AsyncDataLoaderService } from '../async-data-loader/async-data-loader.service';

@Component({
  selector: 'app-dialog-vehicle',
  templateUrl: './dialog-vehicle.component.html',
  styleUrls: ['./dialog-vehicle.component.scss']
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

  preparePrint() {
    console.log('preparing to print');
  }

  ngOnDestroy() {
    this.asyncDataLoader.destroy(this.asyncDataId);
  }

}
