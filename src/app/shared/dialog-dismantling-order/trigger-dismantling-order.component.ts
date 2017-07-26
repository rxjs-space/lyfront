import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdDialog } from '@angular/material';

import { DialogDismantlingOrderComponent } from '../../shared/dialog-dismantling-order/dialog-dismantling-order.component';
import { FormUtilsService } from '../form-utils/form-utils.service';

@Component({
  selector: 'app-trigger-dismantling-order',
  templateUrl: './trigger-dismantling-order.component.html',
  styleUrls: ['./trigger-dismantling-order.component.scss']
})
export class TriggerDismantlingOrderComponent implements OnInit {
  @Input() types;
  @Input() titles;
  @Input() vehicle;
  // @Output() createdNew = new EventEmitter();
  @Input() canCreateNew;
  @Input() isDismantlingReady;
  constructor(
    private fu: FormUtilsService,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    // console.log(this.vehicle);
    // this.canCreateNew = !this.vehicle.dismantling && !this.vehicle.status.dismantled.done;
    // console.log(this.canCreateNew);
  }

  openDialogDO(vehicle) {
    const dialogRef = this.dialog.open(DialogDismantlingOrderComponent, {
      width: '650px',
      disableClose: true,
      data: {
        types: this.types,
        titles: this.titles,
        vin: vehicle.vin,
        vehicleType: vehicle.vehicle.vehicleType,
        // vehicleType: this.fu.idToName(vehicle.vehicle.vehicleType, this.types.vehicleTypes),
        canCreateNew: this.canCreateNew
      },
    });

    // dialogRef.afterClosed().subscribe(result => this.createdNew.emit(result));
  }


}
