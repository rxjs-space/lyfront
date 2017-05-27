import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-yes-or-no',
  templateUrl: './dialog-yes-or-no.component.html',
  styleUrls: ['./dialog-yes-or-no.component.scss']
})
export class DialogYesOrNoComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<DialogYesOrNoComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
