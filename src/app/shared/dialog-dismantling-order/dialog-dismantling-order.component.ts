import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';


import { DataService } from '../../data/data.service';


@Component({
  selector: 'app-dialog-dismantling-order',
  templateUrl: './dialog-dismantling-order.component.html',
  styleUrls: ['./dialog-dismantling-order.component.scss']
})
export class DialogDismantlingOrderComponent implements OnInit {
  vehicle: any;
  doForm: FormGroup;
  pendingTaskCountRxx = new BehaviorSubject(0);
  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<DialogDismantlingOrderComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
    public data: DataService
  ) { }

  ngOnInit() {
    // console.log(this.dataFromTrigger);
    this.refreshVehicle(this.dataFromTrigger.vin);
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

  rebuildForm() {
    console.log('building form');
    this.doForm = this.fb.group({
      orderDate: [{value: (new Date()).toISOString().slice(0, 10), disabled: true}],
      orderType: ['', [Validators.required]],
      dismantlingPIC: ['', [Validators.required]]
    });
  }

}
