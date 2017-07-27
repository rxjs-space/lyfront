import { Component, Inject, Input, Output, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../shared/async-data-loader';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-dialog-dismantling-order2',
  templateUrl: './dialog-dismantling-order2.component.html',
  styleUrls: ['./dialog-dismantling-order2.component.scss']
})
export class DialogDismantlingOrder2Component extends BaseForComponentWithAsyncData implements OnInit {
  asyncDataHolderId = 'DialogDismantlingOrder2Component' + Math.random();
  dataRxHash = {
    dismantlingOrder: this.backend.getDismantlingOrderById(this.dataFromTrigger.dismantlingOrderId),
    staffs: this.backend.getStaffs()
  };
  holderPub: SubHolder;
  isNew = this.dataFromTrigger.dismantlingOrderId ? false : true;
  constructor(
    public dialogRef: MdDialogRef<DialogDismantlingOrder2Component>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService
  ) {
    super(asyncDataLoader, backend);
   }

  ngOnInit() {
    super.ngOnInit();
    this.holderPub = this.holder;
    
  }

}
