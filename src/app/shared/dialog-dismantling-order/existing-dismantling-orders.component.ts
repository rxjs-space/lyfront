import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-existing-dismantling-orders',
  templateUrl: './existing-dismantling-orders.component.html',
  styleUrls: ['./existing-dismantling-orders.component.scss']
})
export class ExistingDismantlingOrdersComponent implements OnInit {
  @Input() vin: any;
  @Input() titles: any;
  dismantlingOrdersForm: FormGroup;
  dismantlingOrders: any;
  vehicle: any;
  pendingTaskCountRxx = new BehaviorSubject(0);
  dataLoadedRxx = new BehaviorSubject(null);


  constructor(
    private data: DataService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.refreshDismantlingOrders(this.vin);
    this.refreshVehicle(this.vin);
    this.rebuildForm();

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
    this.pendingTaskCountRxx
      .filter(v => v === 0)
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
    this.pendingTaskCountRxx.next(this.pendingTaskCountRxx.getValue() + 1);
    this.data.getVehicleByVIN(vin)
      .first()
      .catch(error => Observable.of({
        ok: false,
        error
      }))
      .subscribe(v => {
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
    this.pendingTaskCountRxx.next(this.pendingTaskCountRxx.getValue() + 1);
    this.data.getDismantlingOrders({vin})
      .first()
      .catch(error => Observable.of({
        ok: false,
        error
      }))
      .subscribe(dismantlingOrders => {
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