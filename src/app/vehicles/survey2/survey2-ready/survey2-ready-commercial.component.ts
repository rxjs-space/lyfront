import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-survey2-ready-commercial',
  templateUrl: './survey2-ready-commercial.component.html',
  styleUrls: ['./survey2-ready-commercial.component.scss']
})
export class Survey2ReadyCommercialComponent implements OnInit {
  @Input() reports: any;
  @Input() btity: any;
  @Output() openDialogVehicleList = new EventEmitter();
  dataProps = [
    {title: '本周', name: 'thisWeek'},
    {title: '上周', name: 'lastWeek'},
    {title: '更早', name: 'evenEarlier'},
    {title: '合计', name: 'total'},
  ];
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
          sumPredicate: curr => {return curr['status.firstSurvey.done'] && !curr['status.secondSurvey.done']; }},
      ]
    }
  ];
  filterValueChangesRxx = new BehaviorSubject({surveyStatus: this.optionsArr[0].initValue});
  processedReport: any;
  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    const sub0_ = this.filterValueChangesRxx.subscribe(filterValue => {
      this.calculateProcessedReport(filterValue);
    });

    this.subscriptions.push(sub0_);
  }

  calculateProcessedReport(filterValue) {
    const report = this.reports['resultSurveyReadyCommercialVehiclesNonMotorcycle'];
    const vehicleTypeIdsForMotocycle = this.btity['types']['vehicleTypeIdsForMotocycle'];
    const surveyStatus = filterValue['surveyStatus'];
    this.processedReport = report.reduce((acc, curr) => {
      const currType = vehicleTypeIdsForMotocycle.indexOf(curr['vehicle.vehicleType']) > -1
        ? '摩托车' : '非摩托车';
      const temp = Object.assign({}, acc[currType]); // a shallow copy
      for (const item of this.dataProps) {
        const week = item.name;
        const sumPredicate = this.optionsArr[0]['options'].find(i => i.value === surveyStatus)['sumPredicate'];
        if (sumPredicate(curr)) {
          temp[week] = (acc[currType] ? (acc[currType][week] ? acc[currType][week] : 0) : 0) + curr[week];
        }
      }
      acc[currType] = Object.assign({}, temp);
      return acc;
    }, {});
  }

  queryList(entranceWeek, simpleVehicleType?) {
    console.log(entranceWeek, simpleVehicleType);
    const surveyStatus = (this.filterValueChangesRxx.getValue()).surveyStatus;
    const searchQuery = {
      entranceWeek,
      isSurveyNecessary: true,
      'status2.isSurveyReady': true,
      'status.secondSurvey.done': false,
      'vehicle.useCharacter': 'commercial'
    };
    if (surveyStatus > 1) {
      const option = this.optionsArr[0]['options'].find(item => item.value === surveyStatus);
      searchQuery['status.firstSurvey.done'] = option['status.firstSurvey.done'];
      searchQuery['status.secondSurvey.done'] = option['status.secondSurvey.done'];
    }
    if (simpleVehicleType) {
      searchQuery['vehicle.vehicleType'] = simpleVehicleType;
    }
    const dialogData = {
        searchQuery,
        source: '待验运营车辆',
        surveyStatus: (this.optionsArr[0].options.find(op => op.value === surveyStatus)),
        entranceWeek: (this.dataProps.find(dp => dp.name === entranceWeek)).title,
        vehicleType: simpleVehicleType
      };
    this.openDialogVehicleList.emit(dialogData);

  }


}
