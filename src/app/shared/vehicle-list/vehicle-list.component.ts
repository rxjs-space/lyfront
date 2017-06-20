import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';

import { DataService } from '../../data/data.service';
import { AsyncDataLoaderService } from '../async-data-loader/async-data-loader.service';
import { DialogVehicleComponent } from '../dialog-vehicle/dialog-vehicle.component';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit, OnDestroy {
  @Input() searchQuery: any;
  asyncDataLoaderSource = 'vehicleList' + Math.random();
  dataItemList = ['btity', 'vehicleList'];
  btity: any;
  vehicleList: any;
  subscriptions: Subscription[] = [];
  isListRefreshed = false;


  constructor(
    public dialog: MdDialog,
    public asyncDataLoader: AsyncDataLoaderService,
    private data: DataService
  ) { }

  onCreatedNew(event) {
    if (event) {
      this.refreshVehicleList();
      this.isListRefreshed = true;
    }
  }

  openDialogVehicle(vin, vehicle?) {
    this.dialog.open(DialogVehicleComponent, {
      width: '80%',
      // panelClass: '',
      // disableClose: true,
      data: {
        types: this.btity.types,
        titles: this.btity.titles,
        vin,
        vehicle
      }
    })
  }

  ngOnInit() {
    // console.log(this.searchQuery);
    this.refreshBtity();
    this.refreshVehicleList();
    const sub0_ = this.asyncDataLoader.getDataRxxFac(this.asyncDataLoaderSource, this.dataItemList)
      .subscribe(data => {
        // console.log(data);
        if (!data) {
          this.btity = null;
          this.vehicleList = null;
          return;
        }
        this.btity = data['btity'] || null;
        this.vehicleList = data['vehicleList'] || null;
      });
    this.subscriptions.push(sub0_);
  }

  refreshBtity() {
    this.asyncDataLoader.feed(this.asyncDataLoaderSource, this.dataItemList[0], null);
    this.data.btityRxx
      .first()
      .catch(error => Observable.of({
        ok: false,
        error
      }))
      .subscribe(btity => {
        // console.log(btity);
        this.asyncDataLoader.feed(this.asyncDataLoaderSource, this.dataItemList[0], btity);
      });
  }

  refreshVehicleList() {
    this.asyncDataLoader.feed(this.asyncDataLoaderSource, this.dataItemList[1], null);
    this.data.getVehicles(this.searchQuery)
      .first()
      .catch(error => Observable.of({
        ok: false,
        error
      }))
      .subscribe(vehicleList => {
        this.asyncDataLoader.feed(this.asyncDataLoaderSource, this.dataItemList[1], vehicleList);
      });
  }

  ngOnDestroy() {
    this.asyncDataLoader.destroy(this.asyncDataLoaderSource);
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}
