import { Component, Input, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { DialogVehicleListComponent } from '../../../shared/dialog-vehicle-list/dialog-vehicle-list.component';

@Component({
  selector: 'app-entrance-reports-last-five-weeks',
  templateUrl: './entrance-reports-last-five-weeks.component.html',
  styleUrls: ['./entrance-reports-last-five-weeks.component.scss']
})
export class EntranceReportsLastFiveWeeksComponent implements OnInit {
  @Input() reports;
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  queryVehicles(vehicleType, entranceMonday) {
    const searchQuery = {
      'vehicle.vehicleType': vehicleType,
      entranceMonday,
    };
    const dialogRef = this.dialog.open(DialogVehicleListComponent, {
      width: '80%',
      // disableClose: true,
      data: {
        searchQuery,
        source: '车辆入场',
        vehicleType,
        entranceMonday
      },
    });

    dialogRef.afterClosed().subscribe(v => {
      // if (v) {this.needUpdate.emit(true); }
      // this.needUpdate.emit(v);
    });


  }



}
