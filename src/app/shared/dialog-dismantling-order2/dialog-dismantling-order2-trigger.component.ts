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
  @Input() vehicle;
  constructor(
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
  }

  openDialogDO() {
    const dialogRef = this.dialog.open(DialogDismantlingOrder2Component, {
      width: '80%',
      // disableClose: true,
      data: {
        btity: this.btity,
        vehicle: this.vehicle,
        dismantlingOrderId: this.dismantlingOrderId
      },
    });
  }


}
