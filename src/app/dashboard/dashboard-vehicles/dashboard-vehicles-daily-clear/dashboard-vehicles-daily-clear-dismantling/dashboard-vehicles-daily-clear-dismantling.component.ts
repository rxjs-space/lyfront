import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import { ChangeDetectorRef } from '@angular/core';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../../shared/async-data-loader';
import { FormUtilsService } from '../../../../shared/form-utils/form-utils.service';
import { DataService } from '../../../../data/data.service';

@Component({
  selector: 'app-dashboard-vehicles-daily-clear-dismantling',
  templateUrl: './dashboard-vehicles-daily-clear-dismantling.component.html',
  styleUrls: ['./dashboard-vehicles-daily-clear-dismantling.component.scss']
})
export class DashboardVehiclesDailyClearDismantlingComponent extends BaseForComponentWithAsyncData  implements OnInit {
  asyncDataHolderId = 'DashboardVehiclesDailyClearEntranceComponent';
  dataRxHash = {
    reports: this.backend.dismantlingOrdersReports('dailyClearYesterday'),
    btity: this.backend.btityRxx
  };
  btity: any;
  holderPub: SubHolder;
  dailyClearReadyVehicleWithDODataSource = new DismantlingOrdersReportsDailyClearReadyVehiclesWithDO(this.backend);
  dailyClearReadyVehicleWithDOColumns = ['vehicleType', 'noDismantlingOrder', 'hasDismantlingOrder', 'total'];
  dailyClearDOPlacedTheDayBeforeYesterdayDataSource = new DismantlingOrdersReportsDailyClearReadyDOPlacedTheDayBeforeYesterday(this.backend);
  dailyClearDOPlacedTheDayBeforeYesterdayColumns = ['notStarted', 'startedNotCompleted', 'completed', 'total'];

  constructor(
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService,
    public fu: FormUtilsService,
    private cdf: ChangeDetectorRef
  ) {
    super(asyncDataLoader, backend);
  }

  ngOnInit() {
    super.ngOnInit();
    this.holderPub = this.holder;
    const sub0_ = (this.holderPub.isLoadedWithoutErrorRxx as Observable<boolean>)
      .filter(v => v)
      .subscribe(() => {
        this.btity = this.holderPub.latestResultRxxHash['btity'].getValue();
        setTimeout(() => {
          this.cdf.markForCheck(); // force reports tables to show
        }, 0);
      });
    this.subscriptions.push(sub0_);
  }

}

export class DismantlingOrdersReportsDailyClearReadyVehiclesWithDO extends DataSource<any> {
  constructor(private backend: DataService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return this.backend.dismantlingOrdersReportsRxx
      .filter(r => r)
      .filter(r => !!r['dailyClearYesterday'])
      .map(r => r['dailyClearYesterday']['resultVehicleIsDismantlingReadyWithDismantlingOrder']);
  }

  disconnect() {}
}

export class DismantlingOrdersReportsDailyClearReadyDOPlacedTheDayBeforeYesterday extends DataSource<any> {
  constructor(private backend: DataService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return this.backend.dismantlingOrdersReportsRxx
      .filter(r => r)
      .filter(r => !!r['dailyClearYesterday'])
      .map(r => [r['dailyClearYesterday']['resultDismantlingOrdersPlacedTheDayBeforeYesterday']]); // table needs array
  }

  disconnect() {}
}
