import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import { ChangeDetectorRef } from '@angular/core';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../../shared/async-data-loader';
import { FormUtilsService } from '../../../../shared/form-utils/form-utils.service';
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
  btity: any;
  holderPub: SubHolder;
  dailyClearEntranceDataSource = new VehiclesReportsDailyClearYesterdayEntrance(this.backend);
  dailyClearEntranceColumns = ['vehicleType', 'vs1', 'vs2', 'total'];
  dailyClearEntranceMofcomDataSource = new VehiclesReportsDailyClearYesterdayEntranceMofcom(this.backend);
  dailyClearEntranceMofcomColumns = ['noDataEntry', 'onlyDataEntryDone', 'certDone', 'total'];
  dailyClearEntranceDismantlingReadinessDataSource = new VehiclesReportsDailyClearYesterdayEntranceDismantlingReadiness(this.backend);
  dailyClearEntranceDismantlingReadinessColumns = ['notReady', 'ready', 'total'];

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
    // this.backend.vehiclesReportsRxx
    // .filter(r => r)
    // .filter(r => !!r['dailyClearYesterday'] && !!r['dailyClearYesterday']['resultEntranceYesterday'])
    // .map(r => r['dailyClearYesterday']['resultEntranceYesterday'])
    // .subscribe(console.log);
  }

}

export class VehiclesReportsDailyClearYesterdayEntrance extends DataSource<any> {
  constructor(private backend: DataService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return this.backend.vehiclesReportsRxx
      .filter(r => r)
      .filter(r => !!r['dailyClearYesterday'])
      .map(r => r['dailyClearYesterday']['resultEntranceYesterday'])
  }

  disconnect() {}
}
export class VehiclesReportsDailyClearYesterdayEntranceMofcom extends DataSource<any> {
  constructor(private backend: DataService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return this.backend.vehiclesReportsRxx
      .filter(r => r)
      .filter(r => !!r['dailyClearYesterday'])
      .map(r => [r['dailyClearYesterday']['resultEntranceYesterdayMofcom']]) // it needs to be an array
  }

  disconnect() {}
}
export class VehiclesReportsDailyClearYesterdayEntranceDismantlingReadiness extends DataSource<any> {
  constructor(private backend: DataService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return this.backend.vehiclesReportsRxx
      .filter(r => r)
      .filter(r => !!r['dailyClearYesterday'])
      .map(r => [r['dailyClearYesterday']['resultEntranceYesterdayDismantlingReadiness']]) // it needs to be an array
  }

  disconnect() {}
}



