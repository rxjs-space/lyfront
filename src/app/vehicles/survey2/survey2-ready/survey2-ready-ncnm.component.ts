import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-survey2-ready-ncnm',
  templateUrl: './survey2-ready-ncnm.component.html',
  styleUrls: ['./survey2-ready-ncnm.component.scss']
})
export class Survey2ReadyNcnmComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
    this.calculateProcessedReport();
  }

  calculateProcessedReport() {
    const report = this.reports['resultSurveyReadyNonCommercialVehiclesAndMotorcycles'];
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
      isSurveyNecessary: true,
      'status2.isSurveyReady': true,
      'status.secondSurvey.done': false
    };
    switch (simpleVehicleType) {
      case 'motorcycle':
        searchQuery['vehicle.vehicleType'] = simpleVehicleType;
        break;
      case 'non-motorcycle':
        searchQuery['vehicle.vehicleType'] = simpleVehicleType;
        searchQuery['vehicle.useCharacter'] = 'non-commercial';
        break;
      default:
        searchQuery['ncnm'] = true;
    }

    const dialogData = {
        searchQuery,
        surveyStatus: {value: 3}, // this is to work with vehicleListComponent and to pretend that all vehicles here are firstSurvey.done and !secondSurvey.done
        source: '待验非运营车辆及摩托车',
        entranceWeek: (this.dataProps.find(dp => dp.name === entranceWeek)).title,
        vehicleType: simpleVehicleType
    };
    this.openDialogVehicleList.emit(dialogData);
  }


}
