import { Component, Input, OnInit, Output } from '@angular/core';
import { MdDialog } from '@angular/material';

import { DialogDismantlingOrder2Component } from './dialog-dismantling-order2.component';

@Component({
  selector: 'app-dialog-dismantling-order2-trigger',
  templateUrl: './dialog-dismantling-order2-trigger.component.html',
  styleUrls: ['./dialog-dismantling-order2-trigger.component.scss']
})
export class DialogDismantlingOrder2TriggerComponent implements OnInit {
  @Input() btity;
  @Input() dismantlingOrderId;
  @Input() dismantlingOrder;
  @Input() vehicle;
  @Input() vin;
  buttonTitle: string;
  constructor(
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    let buttonTitle;
    switch (true) {
      case !this.dismantlingOrderId:
        buttonTitle = '新建拆解计划2'; break;
      case !!this.dismantlingOrder && !this.dismantlingOrder.startedAt:
        buttonTitle = '填写拆解人并开始拆解'; break;
      case !!this.dismantlingOrder && !this.dismantlingOrder.completedAt:
        buttonTitle = '填写拆解情况'; break;
      default:
        buttonTitle = '查看拆解计划2';
    }
    this.buttonTitle = buttonTitle;
  }

  openDialogDO() {
    const dialogRef = this.dialog.open(DialogDismantlingOrder2Component, {
      width: '80%',
      // disableClose: true,
      data: {
        btity: this.btity,
        vehicle: this.vehicle, // if vehicle already retrieved, use this, otherwise, query with vin
        vin: this.vin,
        dismantlingOrderId: this.dismantlingOrderId,
        dismantlingOrder: this.dismantlingOrder
      },
    });
  }


}
