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

  vehicle: any;
  btity: any;
  asyncDataId = 'dialogVehicleComponent' + Math.random();
  dataItems = ['btity', 'vehicle'];
  isLoadedRxx: any;
  hasErrorRxx: any;
  
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
    console.log(this.dataFromTrigger);
    this.isLoadedRxx = this.asyncDataLoader.isLoadedRxxFac(this.asyncDataId, this.dataItems);
    this.hasErrorRxx = this.asyncDataLoader.hasErrorRxxFac(this.asyncDataId, this.dataItems);
    this.refreshBtity();
    this.refreshVehicle();

    this.holder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
    this.isLoadedWithoutErrorRxx = this.holder.isLoadedWithoutErrorRxx;
    this.isWithErrorRxx = this.holder.isWithErrorRxx;
    this.holder.refreshAll();
  }

  refreshBtity() {
    this.asyncDataLoader.feed(this.asyncDataId, this.dataItems[0], null);
    this.data.btityRxx
      .catch(error => {
        return Observable.of({
          ok: false, error
        });
      })
      .subscribe(btity => {
        this.asyncDataLoader.feed(this.asyncDataId, this.dataItems[0], btity);
        this.btity = btity;
      });
  }

  refreshVehicle() {
    this.asyncDataLoader.feed(this.asyncDataId, this.dataItems[1], null);
    this.data.getVehicleByVIN(this.dataFromTrigger.vin)
      .catch(error => {
        return Observable.of({
          ok: false,
          error
        });
      })
      .subscribe(v => {
        this.asyncDataLoader.feed(this.asyncDataId, this.dataItems[1], v);
        this.vehicle = v;
      });
  }

  preparePrint() {
    console.log('preparing to print');
  }

  ngOnDestroy() {
    this.asyncDataLoader.destroy(this.asyncDataId);
  }

}
