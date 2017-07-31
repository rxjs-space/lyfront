import { Component, Inject, Input, Output, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../shared/async-data-loader';
import { DataService } from '../../data/data.service';
import { FormUtilsService } from '../form-utils/form-utils.service';

@Component({
  selector: 'app-dialog-dismantling-order2',
  templateUrl: './dialog-dismantling-order2.component.html',
  styleUrls: ['./dialog-dismantling-order2.component.scss']
})
export class DialogDismantlingOrder2Component extends BaseForComponentWithAsyncData implements OnInit {
  asyncDataHolderId = 'DialogDismantlingOrder2Component' + Math.random();
  dataRxHash: any;
  holderPub: SubHolder;
  isNew: boolean;
  saveRxx = new Subject();
  isChangedAndValid = false;
  saveButtonTitle: string;
  vehicle: any;
  dismantlingOrder: any;
  constructor(
    public dialogRef: MdDialogRef<DialogDismantlingOrder2Component>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService,
    private fu: FormUtilsService
  ) {
    super(asyncDataLoader, backend);
   }

  ngOnInit() {
    // console.log(JSON.stringify(this.dataFromTrigger.btity.types.parts))
    switch (true) {
      case !this.dataRxHash && !!this.dataFromTrigger.vehicle: // vehicle could already be retrieved
        this.dataRxHash = {
          dismantlingOrder: this.backend.getDismantlingOrderById(this.dataFromTrigger.dismantlingOrderId),
          staffs: this.backend.getStaffs()
        };
        break;
      case !this.dataRxHash && !!this.dataFromTrigger.vin:
        this.dataRxHash = {
          dismantlingOrder: this.backend.getDismantlingOrderById(this.dataFromTrigger.dismantlingOrderId),
          staffs: this.backend.getStaffs(),
          vehicle: this.backend.getVehicleByVIN(this.dataFromTrigger.vin)
        };
        break;

    }

    super.ngOnInit();
    this.holderPub = this.holder;

    this.holderPub.latestResultRxxHash['dismantlingOrder']
      .filter(v => v)
      .startWith(this.dataFromTrigger.dismantlingOrder)
      .subscribe(v => {
        this.isNew = (!v || !v._id) ? true : false;
        switch (true) {
          case !this.isNew && !v.startedAt:
            this.saveButtonTitle = '保存并开始拆解'; break;
          case !this.isNew && !v.completedAt:
            this.saveButtonTitle = '保存拆解进度'; break;
          default:
            this.saveButtonTitle = '保存';
        }

      });


    if (this.dataFromTrigger.vehicle) {
      this.vehicle = this.dataFromTrigger.vehicle;
    } else {
      this.holderPub.latestResultRxxHash['vehicle']
        .filter(v => v)
        .subscribe(v => {
          v.vehicle.vehicleType = this.fu.idToName(v.vehicle.vehicleType, this.dataFromTrigger.btity['types']['vehicleTypes']);
          v.vehicle.brand = this.fu.idToName(v.vehicle.brand, this.dataFromTrigger.btity['brands']);
          this.vehicle = v;
        });
    }

  }

  onSaved(event) {
    console.log(event);
    if (this.isNew) {
      const doId = event;
      // this.isNew = false;
      this.dataRxHash.dismantlingOrder = this.backend.getDismantlingOrderById(doId);
      this.ngOnInit();
    } else {
      this.holderPub.refreshByTitle('dismantlingOrder');
    }
  }

}
