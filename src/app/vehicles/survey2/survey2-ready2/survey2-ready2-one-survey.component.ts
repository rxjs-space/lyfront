import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-survey2-ready2-one-survey',
  templateUrl: './survey2-ready2-one-survey.component.html',
  styleUrls: ['./survey2-ready2-one-survey.component.scss']
})
export class Survey2Ready2OneSurveyComponent implements OnInit {
  @Input() reports: any;
  @Input() btity: any;
  @Output() openDialogVehicleList = new EventEmitter();
  dataProps = [
    {title: '本周', name: 'thisWeek'},
    {title: '上周', name: 'lastWeek'},
    {title: '更早', name: 'evenEarlier'},
    {title: '合计', name: 'total'},
  ];
  processedReport: any;
  title = '仅需一次查验的待验车辆';
  constructor() { }

  ngOnInit() {
    this.calculateProcessedReport();
  }

  calculateProcessedReport() {
    const report = this.reports['resultSurveyReadyOneSurvey'];
    const vehicleTypeIdsForMotocycle = this.btity['types']['vehicleTypeIdsForMotocycle'];
    this.processedReport = report.reduce((acc, curr) => {
      const currType = vehicleTypeIdsForMotocycle.indexOf(curr['vehicle.vehicleType']) > -1
        ? '摩托车' : '非摩托车';
      const temp = Object.assign({}, acc[currType]); // a shallow copy
      for (const item of this.dataProps) {
        const week = item.name;
        temp[week] = (acc[currType] ? (acc[currType][week] ? acc[currType][week] : 0) : 0) + curr[week];
      }
      acc[currType] = Object.assign({}, temp);
      return acc;
    }, {});
  }

  queryList(entranceWeek, simpleVehicleType?) {
    // console.log(entranceWeek, simpleVehicleType);
    const searchQuery = {
      entranceWeek,
      surveyRounds: 'one',
      'status2.isSurveyReady': true,
      'status.firstSurvey.done': false,
    };

    if (simpleVehicleType) {
      searchQuery['vehicle.vehicleType'] = simpleVehicleType;
    }

    const dialogData = {
        searchQuery,
        surveyStatus: {value: 2, viewValue: '未验车'}, // this is to work with vehicleListComponent and to pretend that all vehicles here are firstSurvey.done and !secondSurvey.done
        source: this.title,
        entranceWeek: (this.dataProps.find(dp => dp.name === entranceWeek)).title,
        vehicleType: simpleVehicleType
    };
    this.openDialogVehicleList.emit(dialogData);
  }


}
