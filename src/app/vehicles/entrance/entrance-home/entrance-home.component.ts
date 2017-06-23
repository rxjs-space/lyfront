import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { AsyncDataLoaderService, SubHolder } from '../../../shared/async-data-loader/async-data-loader.service';
import { AsyncMonitorService } from '../../../shared/async-monitor/async-monitor.service';

import { DataService } from '../../../data/data.service';
@Component({
  selector: 'app-entrance-home',
  templateUrl: './entrance-home.component.html',
  styleUrls: ['./entrance-home.component.scss']
})
export class EntranceHomeComponent implements OnInit, OnDestroy {
  asyncDataId = 'entranceHome';
  asyncDataHolder: SubHolder;
  itemRxHash = {
    reports: this.data.vehiclesReports()
  };
  reports: any;
  asyncMonitorHolder_InsertUpdateVehicle = this.asyncMonitor.init('insertUpdateVehicle');
  subscriptions: Subscription[] = [];

  constructor(
    private asyncMonitor: AsyncMonitorService,
    private data: DataService,
    private asyncDataLoader: AsyncDataLoaderService
  ) { }

  ngOnInit() {


    this.asyncDataHolder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
    this.asyncDataHolder.latestResultRxxHash['reports']
      .filter(r => r)
      .subscribe(reports => {
        // console.log(reports);
        const reportsPrepared = this.lastDays(10).reduce((acc, curr) => {
          acc['非摩托车'].push({
            date: curr, total: 0
          });
          acc['摩托车'].push({
            date: curr, total: 0
          });
          return acc;
        }, {'非摩托车': [], '摩托车': [], 'max': 0});

        reports.reduce((acc, curr) => {
          const key = curr['vehicle.vehicleType'] * 1 === 3 ? '摩托车' : '非摩托车';

          const itemToReplace = acc[key].find(item => item.date === curr.entranceDate);
          itemToReplace.total = curr.total + itemToReplace.total;
          if (curr.total > acc.max) {acc.max = curr.total; }
          if (curr.entranceDate === '2017-06-23') {
            // console.log(curr);
            // console.log(itemToReplace);
          }

          return acc;
        }, reportsPrepared);
        // console.log(reportsPrepared);
        this.reports = reportsPrepared;

      });
    this.asyncDataHolder.refreshAll();
    const sub0_ = this.asyncMonitorHolder_InsertUpdateVehicle.subscribe(r => {
      if (r.done && !r.error && r.value) {
        this.asyncDataHolder.refreshByTitle('reports');
      }
    });
    this.subscriptions.push(sub0_);
  }

  lastDays(count = 10) {
    const today = (new Date());
    const onedayMS = 1000 * 60 * 60 * 24;
    const lastDays = [];
    for (let i = 0; i < count; i++) {
      lastDays[i] = (new Date(Date.parse(today.toString()) - onedayMS * (count - 1 - i))).toISOString().slice(0, 10);
    }
    return lastDays;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }
}
