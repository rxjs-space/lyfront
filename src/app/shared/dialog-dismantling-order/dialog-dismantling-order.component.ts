import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/first';
import jsonpatch from 'fast-json-patch';


import { DataService } from '../../data/data.service';
import { DismantlingOrder } from '../../data/dismantling-order';
import { SharedValidatorsService } from '../validators/shared-validators.service';


@Component({
  selector: 'app-dialog-dismantling-order',
  templateUrl: './dialog-dismantling-order.component.html',
  styleUrls: ['./dialog-dismantling-order.component.scss']
})
export class DialogDismantlingOrderComponent implements OnInit {
  dismantlingOrderEmpty = new DismantlingOrder();

  doForm: FormGroup;
  constructor(
    private sv: SharedValidatorsService,
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<DialogDismantlingOrderComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
    public data: DataService
  ) { }

  ngOnInit() {
    // console.log(this.dataFromTrigger);
    this.rebuildForm();
  }



  rebuildForm() {
    console.log('building form');
    this.doForm = this.fb.group({
      vin: this.dataFromTrigger.vin,
      orderDate: [{value: (new Date()).toISOString().slice(0, 10), disabled: true}],
      isAdHoc: [false, [this.sv.shouldBeBoolean()]],
      correspondingSalesOrder: '',
      dismantlingPIC: ['', [Validators.required]],
      vehicleType: [this.dataFromTrigger.vehicleType]
    });
    // this.doForm.valueChanges.subscribe(console.log);
  }


  onDOFormSubmit() {
    console.log('submitting form');
    const dismantlingOrder = Object.assign({}, this.dismantlingOrderEmpty, this.doForm.getRawValue());
    dismantlingOrder.vehicleType = (this.dataFromTrigger.types['vehicleTypes'].find(vt => vt.name === dismantlingOrder.vehicleType)).id;
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
