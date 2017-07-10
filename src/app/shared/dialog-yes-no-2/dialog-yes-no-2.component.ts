import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-yes-no-2',
  templateUrl: './dialog-yes-no-2.component.html',
  styleUrls: ['./dialog-yes-no-2.component.scss']
})
export class DialogYesNo2Component implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<DialogYesNo2Component>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
  ) { }

  ngOnInit() {
  }

  onYes() {
    this.dialogRef.close('yes');
  }

  onNo() {
    this.dialogRef.close('no');
  }

}
