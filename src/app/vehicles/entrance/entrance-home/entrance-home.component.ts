import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AsyncDataLoaderService, SubHolder } from '../../../shared/async-data-loader/async-data-loader.service';
import { AsyncMonitorService } from '../../../shared/async-monitor/async-monitor.service';
import { TimeCalculationService } from '../../../shared/time-calculation/time-calculation.service';
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
    reports: this.data.vehiclesReports('entrance'),
    btity: this.data.btityRxx
  };
  reports: any;
  asyncMonitorHolder_InsertUpdateVehicle = this.asyncMonitor.init('insertUpdateVehicle');
  subscriptions: Subscription[] = [];

  constructor(
    private asyncMonitor: AsyncMonitorService,
    private data: DataService,
    private asyncDataLoader: AsyncDataLoaderService,
    private tc: TimeCalculationService
  ) { }

  ngOnInit() {

    const last5Mondays: string[] = this.tc.lastMondays(5);
    this.asyncDataHolder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
    (this.asyncDataHolder.isLoadedWithoutErrorRxx as Observable<boolean>)
      .filter(v => v)
      .subscribe(() => {
        const reportsRaw = this.asyncDataHolder.latestResultRxxHash['reports'].getValue();
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

        const btity = this.asyncDataHolder.latestResultRxxHash['btity'].getValue();
        const vehicleTypeIdsForMotocycle = btity['types']['vehicleTypeIdsForMotocycle'];
        reportsRaw['lastTenDays'].reduce((acc, curr) => {
          const key = vehicleTypeIdsForMotocycle.indexOf(curr['vehicle.vehicleType']) > -1
            ? '摩托车' : '非摩托车';

          const itemToReplace = acc[key].find(item => item.date === curr.entranceDate);
          itemToReplace.total = curr.total + itemToReplace.total;
          if (curr.total > acc.max) {acc.max = curr.total; }
          return acc;
        }, reportsPreparedLastTenDays);
        // console.log(reportsPreparedLastTenDays);

        const emptyReportWeekly: any[] = [
          {entranceDate: 0, total: 0},
          {entranceDate: 0, total: 0},
          {entranceDate: 0, total: 0},
          {entranceDate: 0, total: 0},
          {entranceDate: 0, total: 0},
        ];
        for (let i = 0; i < 5; i ++) {
          emptyReportWeekly.push({
            entranceDate: last5Mondays[i],
            total: 0
          });
        }

        const reportsPreparedLastFiveWeeks = reportsRaw['lastFiveWeeks'].reduce((acc, curr) => {
          // console.log(curr);
          const currType = Object.keys(curr)[0];
          const key = vehicleTypeIdsForMotocycle.indexOf(currType) > -1 ? '摩托车' : '非摩托车';
          curr[currType].forEach(r => {
            // console.log(r);
            const itemX = acc[key].find(item => item.entranceDate === r.entranceDate);
            itemX.total += r.total;
          });

          acc[key].forEach(item => {
            if (item.total > acc.max) {
              acc.max = item.total;
            }
          });
          // console.log(acc);

          // switch (true) {
          //   case vehicleTypeIdsForMotocycle.indexOf(currType) > -1:
          //     curr[currType].forEach(r => {
          //       const itemX = acc['摩托车'].find(item => item.entranceDate === r.entranceDate);
          //       itemX.total = r.total;
          //     });

          //     acc['摩托车'].forEach(item => {
          //       if (item.total > acc.max) {
          //         acc.max = item.total;
          //       }
          //     });
          //     // acc['摩托车'] = [
          //     //   {entranceDate: 0, total: 0},
          //     //   {entranceDate: 0, total: 0},
          //     //   {entranceDate: 0, total: 0},
          //     //   {entranceDate: 0, total: 0},
          //     //   {entranceDate: 0, total: 0},
          //     // ].concat(acc['摩托车']);
          //     break;
          //   default:
          //     if (!acc['非摩托车'].length) {
          //       acc['非摩托车'] = curr[currType];
          //       acc['非摩托车'] = [
          //         {entranceDate: 0, total: 0},
          //         {entranceDate: 0, total: 0},
          //         {entranceDate: 0, total: 0},
          //         {entranceDate: 0, total: 0},
          //         {entranceDate: 0, total: 0},
          //       ].concat(acc['非摩托车']);

          //     } else {
          //       acc['非摩托车'] = acc['非摩托车'].map(item => {
          //         if (item.entranceDate !== 0) {
          //           item.total += curr[currType].find(iitem => iitem.entranceDate === item.entranceDate)['total'];
          //         }
          //         return item;
          //       });
          //       acc['非摩托车'].forEach(item => {
          //         if (item.total > acc.max) {
          //           acc.max = item.total;
          //         }
          //       });
          //     }
          // }
          return acc;
        }, {
          '非摩托车': JSON.parse(JSON.stringify(emptyReportWeekly)),
          '摩托车': JSON.parse(JSON.stringify(emptyReportWeekly)),
          'max': 10
        });
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
