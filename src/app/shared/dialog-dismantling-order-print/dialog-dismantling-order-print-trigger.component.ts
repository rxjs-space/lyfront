import { Component, Input, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DialogDismantlingOrderPrintComponent } from './dialog-dismantling-order-print.component';
@Component({
  selector: 'app-dialog-dismantling-order-print-trigger',
  templateUrl: './dialog-dismantling-order-print-trigger.component.html',
  styleUrls: ['./dialog-dismantling-order-print-trigger.component.scss']
})
export class DialogDismantlingOrderPrintTriggerComponent implements OnInit {
  @Input() dismantlingOrder: any;
  @Input() buttonTitle: string;
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(DialogDismantlingOrderPrintComponent, {
      width: '80%',
      data: {
        dismantlingOrder: this.dismantlingOrder
      }
    });
  }

}
