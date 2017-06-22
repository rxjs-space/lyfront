import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-dismantling-order-list',
  templateUrl: './dialog-dismantling-order-list.component.html',
  styleUrls: ['./dialog-dismantling-order-list.component.scss']
})
export class DialogDismantlingOrderListComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<DialogDismantlingOrderListComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
  ) { }

  ngOnInit() {
  }

}
