import { Component, Input, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { DialogDismantlingOrderComponent } from '../../shared/dialog-dismantling-order/dialog-dismantling-order.component';

@Component({
  selector: 'app-trigger-dismantling-order',
  templateUrl: './trigger-dismantling-order.component.html',
  styleUrls: ['./trigger-dismantling-order.component.scss']
})
export class TriggerDismantlingOrderComponent implements OnInit {
  @Input() types;
  @Input() titles;
  @Input() vehicle;
  canCreateNew = false;
  constructor(
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
  }

  openDialogDO(vehicle) {
    console.log(vehicle);
    this.canCreateNew = !vehicle.dismantling && !vehicle.status.dismantled.done;
    console.log(this.canCreateNew);
    const dialogRef = this.dialog.open(DialogDismantlingOrderComponent, {
      width: '650px',
      data: {
        types: this.types,
        titles: this.titles,
        vin: vehicle.vin,
        vehicleType: vehicle.vehicle.vehicleType,
        canCreateNew: this.canCreateNew
      },
    });
  }


}
