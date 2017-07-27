import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/first';
import jsonpatch from 'fast-json-patch';


import { DataService } from '../../data/data.service';
import { DismantlingOrder } from '../../data/dismantling-order';
import { SharedValidatorsService } from '../validators/shared-validators.service';
import { AsyncMonitorService } from '../async-monitor/async-monitor.service';
import { FormUtilsService } from '../form-utils/form-utils.service';

@Component({
  selector: 'app-dialog-dismantling-order',
  templateUrl: './dialog-dismantling-order.component.html',
  styleUrls: ['./dialog-dismantling-order.component.scss']
})
export class DialogDismantlingOrderComponent implements OnInit {
  dismantlingOrderEmpty = new DismantlingOrder();

  doForm: FormGroup;
  @Output() createdNew = new EventEmitter();
  createdNewRxx = new BehaviorSubject(null);
  creatingNewRxx = new BehaviorSubject(false);
  dismantlingListLoaded: boolean;
  asyncMonitorId = 'dialogDismantlingOrder';
  asyncMonitorHolder: any;
  constructor(
    private fu: FormUtilsService,
    private sv: SharedValidatorsService,
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<DialogDismantlingOrderComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
    public data: DataService,
    private asyncMonitor: AsyncMonitorService
  ) { }

  ngOnInit() {
    // console.log(this.dataFromTrigger);
    if (this.dataFromTrigger.canCreateNew) {
      this.rebuildForm();

      const enableForm = () => {
        this.doForm.enable();
        this.doForm.get('orderDate').disable();
      };
      this.creatingNewRxx.subscribe(v => {
        v ? this.doForm.disable() : enableForm()
      });

      this.asyncMonitorHolder = this.asyncMonitor.init(this.asyncMonitorId);

    }

  }



  rebuildForm() {
    // console.log('building form');
    this.doForm = this.fb.group({
      vin: this.dataFromTrigger.vin,
      orderDate: [{value: (new Date()).toISOString().slice(0, 10), disabled: true}],
      isAdHoc: [false, [this.sv.shouldBeBoolean()]],
      correspondingSalesOrder: '',
      // dismantlingPIC: ['', [Validators.required]],
      vehicleType: [this.fu.nameToId(this.dataFromTrigger.vehicleType, this.data.btityRxx.getValue()['types']['vehicleTypes'])]
    });
    // this.doForm.valueChanges.subscribe(console.log);
  }


  onDOFormSubmit() {
    console.log('submitting form');
    this.creatingNewRxx.next(true);
    this.asyncMonitorHolder.next({
      done: false,
      value: null
    });
    const dismantlingOrder = Object.assign({}, this.dismantlingOrderEmpty, this.doForm.getRawValue());
    // dismantlingOrder.vehicleType = (this.dataFromTrigger.types['vehicleTypes'].find(vt => vt.name === dismantlingOrder.vehicleType)).id;
    const patches = jsonpatch.compare(this.dismantlingOrderEmpty, dismantlingOrder);
    this.data.insertDismantlingOrder({
      dismantlingOrder, patches
    })
    .first()
    .catch(error => {
      return Observable.of({
        ok: false,
        error
      });
    })
    .subscribe(result => {
      this.createdNew.emit(result);
      this.createdNewRxx.next(result);
      this.creatingNewRxx.next(false);

      this.asyncMonitorHolder.next({
        done: true,
        value: result
      });

    });
    // save the form.value
    // update doList
    // update vehicle.dismantling
  }

}
