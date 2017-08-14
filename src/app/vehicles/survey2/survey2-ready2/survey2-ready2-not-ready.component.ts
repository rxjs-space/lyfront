import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-survey2-ready2-not-ready',
  templateUrl: './survey2-ready2-not-ready.component.html',
  styleUrls: ['./survey2-ready2-not-ready.component.scss']
})
export class Survey2Ready2NotReadyComponent implements OnInit {
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
  title = '暂缓查验车辆';
  constructor() { }


  ngOnInit() {
    this.calculateProcessedReport();
  }

  calculateProcessedReport() {
    const report = this.reports['resultIsSurveyNotReady'];
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
      'status2.isSurveyReady': false,
      'isSurveyNecessary': true
    };
    
    if (simpleVehicleType) {
      searchQuery['vehicle.vehicleType'] = simpleVehicleType;
    }

    const dialogData = {
        searchQuery,
        source: '暂缓查验车辆',
        entranceWeek: (this.dataProps.find(dp => dp.name === entranceWeek)).title,
        vehicleType: simpleVehicleType
    };
    this.openDialogVehicleList.emit(dialogData);
  }


}
