import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import { MdDialog } from '@angular/material';

import { DialogVehicleListComponent } from '../../../shared/dialog-vehicle-list/dialog-vehicle-list.component';
import { DataService } from '../../../data/data.service';
import { AsyncDataLoaderService, SubHolder } from '../../../shared/async-data-loader/async-data-loader.service';
import { AsyncMonitorService } from '../../../shared/async-monitor/async-monitor.service';
@Component({
  selector: 'app-survey-idle',
  templateUrl: './survey-idle.component.html',
  styleUrls: ['./survey-idle.component.scss']
})
export class SurveyIdleComponent implements OnDestroy, OnInit {

  asyncDataId = 'SurveyIdleComponent';
  itemRxHash = {
    reports: this.data.vehiclesReports('surveyIdle')
  };
  holder: SubHolder;
  filterValueChangesRxx: BehaviorSubject<any>;
  optionsArr = [
    {
      title: 'surveyStatus',
      placeholder: '验车状态',
      initValue: 3,
      options: [
        {value: 1, viewValue: '全部',
          sumPredicate: curr => {return true; }},
        {value: 2, viewValue: '未验车', 'status.firstSurvey.done': false, 'status.secondSurvey.done': false,
          sumPredicate: curr => {return !curr['status.firstSurvey.done'] && !curr['status.secondSurvey.done']; }},
        {value: 3, viewValue: '首次验车完成未二次验车', 'status.firstSurvey.done': true, 'status.secondSurvey.done': false,
          sumPredicate: curr => {return curr['status.firstSurvey.done'] && !curr['status.secondSurvey.done']}},
      ]
    }
  ];

  filterCache = {};
  filteredData = null;
  subscriptions: Subscription[] = [];
  dataProps = [
    {title: '本周', name: 'thisWeek'},
    {title: '上周', name: 'lastWeek'},
    {title: '更早', name: 'evenEarlier'},
    {title: '合计', name: 'total'},
  ];
  asyncMonitorToWatch: any;

  constructor(
    private asyncMonitor: AsyncMonitorService,
    public dialog: MdDialog,
    private data: DataService,
    public asyncDataLoader: AsyncDataLoaderService
  ) { }

  calculateFilteredData(combo) {
    const surveyStatus = combo['filter']['surveyStatus'];
    const reports = combo['reports'];
    return reports.reduce((acc, curr) => {
      const currType = curr['vehicle.vehicleType'] * 1 === 3 ? '摩托车' : '非摩托车';
      const obj = Object.assign({}, acc[currType]);
      for (const item of this.dataProps) {
        const name = item.name; // week
        const sumPredicate = this.optionsArr[0]['options'].find(i => i.value === surveyStatus)['sumPredicate'];
        if (sumPredicate(curr)) {
          obj[name] = (acc[currType] ? (acc[currType][name] ? acc[currType][name] : 0) : 0) + curr[name];
        }
      }
      acc[currType] = Object.assign({}, obj);
      return acc;
    }, {});
  }



  ngOnInit() {
    this.asyncMonitorToWatch = this.asyncMonitor.init('dialogVehicleList');
    this.filterValueChangesRxx = new BehaviorSubject({surveyStatus: this.optionsArr[0].initValue});

    this.holder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
    this.holder.refreshAll();
    const sub0_ = Observable.combineLatest(
      this.holder.latestResultRxxHash['reports'],
      this.filterValueChangesRxx,
      (reports, filter) => ({reports, filter})
    )
      .filter(combo => !!combo['reports'] && !!combo['filter'])
      .subscribe(combo => {
        this.filteredData = this.calculateFilteredData.bind(this)(combo);
      });

    this.subscriptions.push(sub0_);

    const sub1_ = this.asyncMonitorToWatch
      .filter(r => r.done)
      .subscribe(r => {
        if (!r.error) {
          this.holder.refreshByTitle('reports');
        }
      });
    this.subscriptions.push(sub1_);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }


  queryList(entranceWeek, vehicleType?) {
    const surveyStatus = (this.filterValueChangesRxx.getValue()).surveyStatus;
    const searchQuery = {entranceWeek};
    if (surveyStatus > 1) {
      const option = this.optionsArr[0]['options'].find(item => item.value === surveyStatus);
      searchQuery['status.firstSurvey.done'] = option['status.firstSurvey.done'];
      searchQuery['status.secondSurvey.done'] = option['status.secondSurvey.done'];
    }
    if (vehicleType) {
      searchQuery['vehicle.vehicleType'] = vehicleType;
      // vehicleType here could be '3' or 'z', backend will deal with 'z'
    }
    // console.log(searchQuery);
    const dialogRef = this.dialog.open(DialogVehicleListComponent, {
      width: '80%',
      // disableClose: true,
      data: {
        searchQuery,
        source: '待验车辆',
        surveyStatus: (this.optionsArr[0].options.find(op => op.value === surveyStatus)),
        entranceWeek: (this.dataProps.find(dp => dp.name === entranceWeek)).title,
        vehicleType
      },
    });

    dialogRef.afterClosed().subscribe(v => {
      // if (v) {this.needUpdate.emit(true); }
      // this.needUpdate.emit(v);
    });

  }


}
