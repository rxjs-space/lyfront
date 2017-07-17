import { Component, Input, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DialogMofcomLoginComponent } from './dialog-mofcom-login.component';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-dialog-mofcom-login-trigger',
  templateUrl: './dialog-mofcom-login-trigger.component.html',
  styleUrls: ['./dialog-mofcom-login-trigger.component.scss']
})
export class DialogMofcomLoginTriggerComponent implements OnInit {
  constructor(
    public backend: DataService,
    private dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {

    this.dialog.open(DialogMofcomLoginComponent, {
      // disableClose: true,
      width: '400px'
    });

  }

}



