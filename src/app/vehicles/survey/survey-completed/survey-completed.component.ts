import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AsyncDataLoaderService, SubHolder } from '../../../shared/async-data-loader/async-data-loader.service';
import { AsyncMonitorService } from '../../../shared/async-monitor/async-monitor.service';
import { DataService } from '../../../data/data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-survey-completed',
  templateUrl: './survey-completed.component.html',
  styleUrls: ['./survey-completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyCompletedComponent implements OnInit, OnDestroy {
  isCollapsedRxx = new BehaviorSubject(true);
  asyncDataId = 'SurveyCompletedComponent';
  asyncDataHolder: SubHolder;
  itemRxHash = {
    reports: this.data.vehiclesReports('surveyCompleted')
  };
  reports: any;
  max = 10;
  asyncMonitorToWatch: any;
  subscriptions: Subscription[] = [];
  constructor(
    private asyncMonitor: AsyncMonitorService,
    private data: DataService,
    private asyncDataLoader: AsyncDataLoaderService
  ) { }

  ngOnInit() {
    this.asyncMonitorToWatch = this.asyncMonitor.init('dialogVehicleList');
    this.isCollapsedRxx
      .filter(v => !v)
      .first()
      .subscribe(() => {
        this.asyncDataHolder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
        this.asyncDataHolder.refreshAll();

        const sub0_ = this.asyncMonitorToWatch
          .filter(r => r.done)
          .subscribe(r => {
            if (!r.error) {
              this.asyncDataHolder.refreshByTitle('reports');
            }
          });

        this.subscriptions.push(sub0_);

        const sub1_ = this.asyncDataHolder.latestResultRxxHash['reports']
          .filter(r => r) // ignore null result
          .subscribe(reports => {
            this.reports = reports;
            for (const k of Object.keys(this.reports)) {
              for (const item of this.reports[k]) {
                if (item.total > this.max) {
                  this.max = item.total;
                }
              }
            }
          });

        this.subscriptions.push(sub1_);

      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }
}
