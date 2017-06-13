import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
import jsonpatch from 'fast-json-patch';


import { DataService } from '../../data/data.service';
import { SharedValidatorsService } from '../validators/shared-validators.service';


@Component({
  selector: 'app-dialog-dismantling-order',
  templateUrl: './dialog-dismantling-order.component.html',
  styleUrls: ['./dialog-dismantling-order.component.scss']
})
export class DialogDismantlingOrderComponent implements OnInit {
  dismantlingOrderEmpty = {
    orderDate: '',
    isAdHoc: false,
    correspondingSalesOrder: '',
    dismantlingPIC: '',
    completed: false,
  };
  trueFalseCombo = [
    {value: false, title: '否'},
    {value: true, title: '是'}
  ]
  vehicle: any;
  dismantlingOrders: any;
  doForm: FormGroup;
  pendingTaskCountRxx = new BehaviorSubject(0);
  constructor(
    private sv: SharedValidatorsService,
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<DialogDismantlingOrderComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
    public data: DataService
  ) { }

  ngOnInit() {
    // console.log(this.dataFromTrigger);
    this.refreshVehicle(this.dataFromTrigger.vin);
    this.refreshDismantlingOrders(this.dataFromTrigger.vin);
    this.pendingTaskCountRxx
      .filter(v => v === 0)
      .first()
      .subscribe(() => this.rebuildForm());
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
        console.log(dismantlingOrders);
        this.dismantlingOrders = dismantlingOrders;
        this.pendingTaskCountRxx.next(this.pendingTaskCountRxx.getValue() - 1);
      });
  }

  rebuildForm() {
    console.log('building form');
    this.doForm = this.fb.group({
      vin: this.vehicle.vin,
      orderDate: [{value: (new Date()).toISOString().slice(0, 10), disabled: true}],
      isAdHoc: [false, [this.sv.shouldBeBoolean()]],
      correspondingSalesOrder: '',
      dismantlingPIC: ['', [Validators.required]]
    });
    this.doForm.valueChanges.subscribe(console.log);
  }

    /*

    completed
    :
    false
    correspondingSalesOrder
    :
    ""
    createdAt
    :
    "2017-06-13T13:14:23.018Z"
    createdBy
    :
    "59251ad024ac463e20bee3a7"
    dismantlingPIC
    :
    "asdf"
    isAdHoc
    :
    false
    orderDate
    :
    "2017-06-13"
    vin
    :
    "qwer"
    _id
    :
    "593fe52f74879a38686dc48b"

    */


  onDOFormSubmit() {
    console.log('submitting form');
    const dismantlingOrder = Object.assign({}, this.dismantlingOrderEmpty, this.doForm.getRawValue());
    const patches = jsonpatch.compare(this.dismantlingOrderEmpty, dismantlingOrder);
    this.data.insertDismantlingOrder({
      dismantlingOrder, patches
    })
    .first()
    .subscribe(res => console.log(res));
    // save the form.value
    // update doList
    // update vehicle.dismantling
  }

}
