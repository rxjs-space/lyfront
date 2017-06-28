import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AsyncDataLoaderService, SubHolder } from '../../../shared/async-data-loader/async-data-loader.service';
import { AsyncMonitorService } from '../../../shared/async-monitor/async-monitor.service';
import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-survey-completed',
  templateUrl: './survey-completed.component.html',
  styleUrls: ['./survey-completed.component.scss']
})
export class SurveyCompletedComponent implements OnInit {
  isCollapsedRxx = new BehaviorSubject(true);
  asyncDataId = 'entranceHome';
  asyncDataHolder: SubHolder;
  itemRxHash = {
    reports: this.data.vehiclesReports('surveyCompleted')
  };
  reports: any;
  max = 10;
  constructor(
    private data: DataService,
    private asyncDataLoader: AsyncDataLoaderService
  ) { }

  ngOnInit() {
    this.isCollapsedRxx
      .filter(v => !v)
      .first()
      .subscribe(() => {
        this.asyncDataHolder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
        this.asyncDataHolder.refreshAll();

        this.asyncDataHolder.latestResultRxxHash['reports']
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
      });
  }

}
