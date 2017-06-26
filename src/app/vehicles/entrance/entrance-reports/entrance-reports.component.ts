import { Component, Input, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { DialogVehicleListComponent } from '../../../shared/dialog-vehicle-list/dialog-vehicle-list.component';

@Component({
  selector: 'app-entrance-reports',
  templateUrl: './entrance-reports.component.html',
  styleUrls: ['./entrance-reports.component.scss']
})
export class EntranceReportsComponent implements OnInit {
  @Input() reports;

  constructor(
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
  }

  queryVehicles(vType, date) {
    const searchQuery = {'vehicle.vehicleType': vType, 'entranceDate': date}
    const dialogRef = this.dialog.open(DialogVehicleListComponent, {
      width: '80%',
      // disableClose: true,
      data: {
        searchQuery,
        source: '车辆入场',
        vehicleType: vType,
        entranceDate: date
        // types: this.zipData.types,
        // titles: this.zipData.titles,
        // vin: vehicleBrief.vin,
        // vehicleType: vehicleBrief.vehicle.vehicleType,
        // canCreateNew: !vehicleBrief.dismantling && !vehicleBrief.status.dismantled.done
      },
    });

    dialogRef.afterClosed().subscribe(v => {
      // if (v) {this.needUpdate.emit(true); }
      // this.needUpdate.emit(v);
    });


  }


}
