import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';

import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../../shared/async-data-loader';
import { DataService } from '../../../../data/data.service';

@Component({
  selector: 'app-dashboard-vehicles-daily-clear-entrance',
  templateUrl: './dashboard-vehicles-daily-clear-entrance.component.html',
  styleUrls: ['./dashboard-vehicles-daily-clear-entrance.component.scss']
})
export class DashboardVehiclesDailyClearEntranceComponent extends BaseForComponentWithAsyncData implements OnInit {
  asyncDataHolderId = 'DashboardVehiclesDailyClearEntranceComponent';
  dataRxHash = {
    reports: this.backend.vehiclesReports('dailyClearYesterday'),
    btity: this.backend.btityRxx
  };
  holderPub: SubHolder;
  dailyClearDataSource = new VehiclesReportsDailyClearYesterdayEntrance(this.backend);

  constructor(
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService,
  ) {
    super(asyncDataLoader, backend);
  }
  ngOnInit() {
    super.ngOnInit();
    this.holderPub = this.holder;
  }

}

export class VehiclesReportsDailyClearYesterdayEntrance extends DataSource<any> {
  constructor(private backend: DataService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return this.backend.vehiclesReports('dailyClearYesterday')
      .map(r => r.resultEntranceYesterday)
    .do(console.log);
  }

  disconnect() {}
}
