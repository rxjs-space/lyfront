import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogYesNo2Component } from '../dialog-yes-no-2/dialog-yes-no-2.component';
@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss']
})
export class CloseButtonComponent implements OnInit {
  @Input() dialogRef: any;
  @Input() fform: FormGroup;
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  onClose() {
    if (this.fform && this.fform.dirty) {
      this.openConfirmationDialog();
    } else {
      this.dialogRef.close();
    }
  }

  openConfirmationDialog() {
    const dialogRefYesNo = this.dialog.open(DialogYesNo2Component, {
      disableClose: true,
      data: {
        title: '放弃更改？',
        content: '表单内容已更改。放弃更改？',
        yesButton: '放弃更改',
        noButton: '继续编辑',
        raisedButton: 'no'
      }
    });
    dialogRefYesNo.afterClosed().subscribe(v => {
      if (v === 'yes') {
        this.dialogRef.close();
      }
    });
  }

}
