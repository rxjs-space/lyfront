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
    reports: this.data.vehiclesReports('entrance')
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
      .subscribe(reportsRaw => {
        // console.log(reportsRaw);
        const reportsPreparedLastTenDays = this.lastDays(10).reduce((acc, curr) => {
          acc['非摩托车'].push({
            date: curr, total: 0
          });
          acc['摩托车'].push({
            date: curr, total: 0
          });
          return acc;
        }, {'非摩托车': [], '摩托车': [], 'max': 10});

        reportsRaw['lastTenDays'].reduce((acc, curr) => {
          const key = curr['vehicle.vehicleType'] * 1 === 3 ? '摩托车' : '非摩托车';

          const itemToReplace = acc[key].find(item => item.date === curr.entranceDate);
          itemToReplace.total = curr.total + itemToReplace.total;
          if (curr.total > acc.max) {acc.max = curr.total; }
          return acc;
        }, reportsPreparedLastTenDays);
        // console.log(reportsPreparedLastTenDays);
        const reportsPreparedLastFiveWeeks = reportsRaw['lastFiveWeeks'].reduce((acc, curr) => {
          const currType = Object.keys(curr)[0];
          switch (currType) {
            case '3':
              acc['摩托车'] = curr[currType];
              acc['摩托车'].forEach(item => {
                if (item.total > acc.max) {
                  acc.max = item.total;
                }
              });
              acc['摩托车'] = [
                {entranceDate: 0, total: 0},
                {entranceDate: 0, total: 0},
                {entranceDate: 0, total: 0},
                {entranceDate: 0, total: 0},
                {entranceDate: 0, total: 0},
              ].concat(acc['摩托车']);
              break;
            default:
              if (!acc['非摩托车'].length) {
                acc['非摩托车'] = curr[currType];
                acc['非摩托车'] = [
                  {entranceDate: 0, total: 0},
                  {entranceDate: 0, total: 0},
                  {entranceDate: 0, total: 0},
                  {entranceDate: 0, total: 0},
                  {entranceDate: 0, total: 0},
                ].concat(acc['非摩托车']);

              } else {
                acc['非摩托车'] = acc['非摩托车'].map(item => {
                  if (item.entranceDate !== 0) {
                    item.total += curr[currType].find(iitem => iitem.entranceDate === item.entranceDate)['total'];
                  }
                  return item;
                });
                acc['非摩托车'].forEach(item => {
                  if (item.total > acc.max) {
                    acc.max = item.total;
                  }
                });
              }
          }
          return acc;
        }, {'非摩托车': [], '摩托车': [], 'max': 10});
        // console.log(reportsPreparedLastFiveWeeks);


        this.reports = {
          lastTenDays: reportsPreparedLastTenDays,
          lastFiveWeeks: reportsPreparedLastFiveWeeks
        };

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
    const timezoneDiff = 0;
    // const timezoneDiff = 1000 * 60 * 60 * 8;
    const lastDays = [];
    for (let i = 0; i < count; i++) {
      lastDays[i] = (new Date(Date.parse(today.toString()) - onedayMS * (count - 1 - i) + timezoneDiff)).toISOString().slice(0, 10);
    }
    return lastDays;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }
}
