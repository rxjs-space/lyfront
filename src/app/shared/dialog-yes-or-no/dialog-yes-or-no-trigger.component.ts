import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { DialogYesOrNoComponent } from './dialog-yes-or-no.component';


@Component({
  selector: 'app-dialog-yes-or-no-trigger',
  templateUrl: './dialog-yes-or-no-trigger.component.html',
  styleUrls: ['./dialog-yes-or-no-trigger.component.scss']
})
export class DialogYesOrNoTriggerComponent implements OnInit {
  @Input() index: string;
  @Output() close = new EventEmitter();
  constructor(private dialog: MdDialog) { }

  ngOnInit() {

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogYesOrNoComponent, {
      data: {
        message: '删除此条记录？',
        index: this.index
      }
    });

    dialogRef.afterClosed()
      .subscribe(v => {
        // console.log(v);
        this.close.emit(v);
      });
  }

}


