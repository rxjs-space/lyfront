import { Component, Input, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { DialogVehicleComponent } from './dialog-vehicle.component';


@Component({
  selector: 'app-dialog-vehicle-trigger',
  templateUrl: './dialog-vehicle-trigger.component.html',
  styleUrls: ['./dialog-vehicle-trigger.component.scss']
})
export class DialogVehicleTriggerComponent implements OnInit {
  @Input() vin: string;
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(DialogVehicleComponent, {
      disableClose: true,
      width: '80%',
      data: {
        vin: this.vin
      }
    });
  }
}
