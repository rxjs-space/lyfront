import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
import { MdDialog } from '@angular/material';

import { AsyncDataLoaderService } from '../async-data-loader/async-data-loader.service';

import { DataService } from '../../data/data.service';
import { DialogDismantlingOrderPrintComponent } from '../dialog-dismantling-order-print/dialog-dismantling-order-print.component';


@Component({
  selector: 'app-existing-dismantling-orders',
  templateUrl: './existing-dismantling-orders.component.html',
  styleUrls: ['./existing-dismantling-orders.component.scss']
})
export class ExistingDismantlingOrdersComponent implements OnInit, OnDestroy {
  @Input() vin: any;
  @Input() titles: any;
  dismantlingOrdersForm: FormGroup;
  dismantlingOrders: any;
  vehicle: any;
  pendingTaskCountRxx = new BehaviorSubject(0); // will be deleted
  dataLoadedRxx = new BehaviorSubject(null); // will be deleted?
  asyncDataLoaderSource = 'existingDismantlingOrders' + Math.random();
  dataItemList = ['vehicle', 'dismantlingOrders'];
  @Input() createdNewRxx: BehaviorSubject<any>;
  subscriptions: Subscription[] = [];
  
  constructor(
    public asyncDataLoader: AsyncDataLoaderService,
    public dialog: MdDialog,
    private data: DataService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.refreshDismantlingOrders(this.vin);
    this.refreshVehicle(this.vin);
    this.rebuildForm();
    const sub0_ = this.createdNewRxx.subscribe(newOne => {
      if (newOne) {
        this.refreshDismantlingOrders(this.vin);
        this.refreshVehicle(this.vin);
        this.rebuildForm();
      }
    });
    this.subscriptions.push(sub0_);

  }

  openDialogPrint() {
    const dialogRef = this.dialog.open(DialogDismantlingOrderPrintComponent);
  }

  rebuildForm() {
    /*
      interface of dOrder: {
        _id: ObjectID;
        orderDate: string;
        isAdHoc: boolean;
        correspondingSalesOrder: ObjectID;
        dismantlingPIC: string;
        completed: boolean;
        completedAt: string;
        vin: string;
        createdAt: string;
        createdBy: ObjectID;
        modifiedAt: string;
        modifiedBy: ObjectID;
      }
    */


    this.asyncDataLoader.isLoadedRxxFac(this.asyncDataLoaderSource, this.dataItemList)
      .filter(v => v)
      .first()
      .subscribe(() => {
        this.dismantlingOrdersForm = this.fb.group({
          dismantlingOrders: this.fb.array(this.dismantlingOrders.map(dOrder => {
            return this.fb.group({
              orderDate: dOrder.orderDate
            });
          }))
        });
        this.dismantlingOrdersForm.disable();
      })
  }


  refreshVehicle(vin) {
    this.asyncDataLoader.feed(this.asyncDataLoaderSource, this.dataItemList[0], null);
    this.pendingTaskCountRxx.next(this.pendingTaskCountRxx.getValue() + 1);
    this.data.getVehicleByVIN(vin)
      .first()
      .catch(error => Observable.of({
        ok: false,
        error
      }))
      .subscribe(v => {
        this.asyncDataLoader.feed(this.asyncDataLoaderSource, this.dataItemList[0], v);
        // update dataLoadedRxx
        if (v.error) {return this.dataLoadedRxx.next(v); };
        if (this.dismantlingOrders && !this.dismantlingOrders.error) {
          this.dataLoadedRxx.next({dataLoaded: true});
        }
        this.vehicle = v;
        this.pendingTaskCountRxx.next(this.pendingTaskCountRxx.getValue() - 1);
      });
  }

  refreshDismantlingOrders(vin) {
    this.asyncDataLoader.feed(this.asyncDataLoaderSource, this.dataItemList[1], null);
    this.pendingTaskCountRxx.next(this.pendingTaskCountRxx.getValue() + 1);
    this.data.getDismantlingOrders({vin})
      .first()
      .catch(error => Observable.of({
        ok: false,
        error
      }))
      .subscribe(dismantlingOrders => {
        this.asyncDataLoader.feed(this.asyncDataLoaderSource, this.dataItemList[1], dismantlingOrders);
        // console.log(dismantlingOrders);
        // update dataLoadedRxx
        if (dismantlingOrders.error) {return this.dataLoadedRxx.next(dismantlingOrders); };
        if (this.vehicle && !this.vehicle.error) {
          this.dataLoadedRxx.next({dataLoaded: true});
        }
        this.dismantlingOrders = dismantlingOrders;
        this.pendingTaskCountRxx.next(this.pendingTaskCountRxx.getValue() - 1);
      });
  }

  ngOnDestroy() {
    this.asyncDataLoader.destroy(this.asyncDataLoaderSource);
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}


// s.typesForm = this.fb.group({
//       parts: this.fb.array(parts.map(p => {
//         return this.fb.group({
//           id: {value: p.id, disabled: true},
//           name: [p.name, [this.sv.duplicateNameInObjArray(parts)]]
//         });
//       })),
//       wastes: this.fb.array(wastes.map(w => {
//         return this.fb.group({
//           id: {value: w.id, disabled: true},
//           name: [w.name, [this.sv.duplicateNameInObjArray(wastes)]]
//         });
//       }))
//     });