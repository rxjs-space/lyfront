import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdDialog } from '@angular/material';

import { DialogVehicleListComponent } from '../../../shared/dialog-vehicle-list/dialog-vehicle-list.component';

@Component({
  selector: 'app-dismantling-idle',
  templateUrl: './dismantling-idle.component.html',
  styleUrls: ['./dismantling-idle.component.scss']
})
export class DismantlingIdleComponent implements OnInit {
  @Input() data;
  @Input() filterCache;
  @Input() btity;
  filteredData;
  filterValueChangesRxx = new BehaviorSubject({surveyStatus: 1});
  // @Output() needUpdate = new EventEmitter();
  optionsArr = [];

  dataProps = [
    {title: '本周', name: 'thisWeek'},
    {title: '上周', name: 'lastWeek'},
    {title: '更早', name: 'evenEarlier'},
    {title: '合计', name: 'total'},
  ];

  basedOnSurveyStatus = {
    '1': {
      sumPredicate: curr => {return true; },
    },
    '2': {
      sumPredicate: curr => {return !curr['status.firstSurvey.done'] && !curr['status.secondSurvey.done']; },
      firstSurvey: false, secondSurvey: false
    },
    '3': {
      sumPredicate: curr => {return curr['status.firstSurvey.done'] && !curr['status.secondSurvey.done']},
      firstSurvey: true, secondSurvey: false
    },
    '4': {
      sumPredicate: curr => {return curr['status.firstSurvey.done'] && curr['status.secondSurvey.done']},
      firstSurvey: true, secondSurvey: true
    },
  };

  constructor(
    public dialog: MdDialog,
  ) { }

  queryList(entranceWeek, vehicleType?) {
    const surveyStatus = (this.filterValueChangesRxx.getValue()).surveyStatus;
    const searchQuery = {entranceWeek};
    searchQuery['status2.dismantling'] = false;
    searchQuery['status.dismantled.done'] = false;
    if (surveyStatus > 1) {
      searchQuery['status.firstSurvey.done'] = this.basedOnSurveyStatus[surveyStatus].firstSurvey;
      searchQuery['status.secondSurvey.done'] = this.basedOnSurveyStatus[surveyStatus].secondSurvey;
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
        source: '未下达拆解计划车辆',
        surveyStatus: (this.optionsArr[0].options.find(op => op.value === surveyStatus)),
        entranceWeek: (this.dataProps.find(dp => dp.name === entranceWeek)).title,
        vehicleType

        // types: this.zipData.types,
        // titles: this.zipData.titles,
        // vin: vehicleBrief.vin,
        // vehicleType: vehicleBrief.vehicle.vehicleType,
        // canCreateNew: !vehicleBrief.dismantling && !vehicleBrief.status.dismantled.done
      },
    });

    dialogRef.afterClosed().subscribe(v => {
      // if (v) {this.needUpdate.emit(true); }
      // this.needUpdate.emit(v);
    });

  }

  calculateFilteredData(surveyStatus) {
    // const predicates = {
    //   '1': curr => {return true; },
    //   '2': curr => {return !curr['status.firstSurvey.done'] && !curr['status.secondSurvey.done']},
    //   '3': curr => {return curr['status.firstSurvey.done'] && !curr['status.secondSurvey.done']},
    //   '4': curr => {return curr['status.secondSurvey.done']},
    // };
    return this.data.reduce((acc, curr) => {
      const vehicleTypeIdsForMotocycle = this.btity['types']['vehicleTypeIdsForMotocycle'];
      const currType = vehicleTypeIdsForMotocycle.indexOf(curr['vehicle.vehicleType']) > -1
        ? '摩托车' : '非摩托车';
      const obj = Object.assign({}, acc[currType]);
      for (const item of this.dataProps) {
        const name = item.name; // week
        // if (predicates[caseValue](curr)) {
        if (this.basedOnSurveyStatus[surveyStatus].sumPredicate(curr)) {
          obj[name] = (acc[currType] ? (acc[currType][name] ? acc[currType][name] : 0) : 0) + curr[name];
        }
      }
      acc[currType] = Object.assign({}, obj);
      return acc;
    }, {});
  }

  ngOnInit() {
    const filterCache = this.filterCache['DismantlingIdleComponent'];

    this.optionsArr = [
      {
        title: 'surveyStatus',
        placeholder: '验车状态',
        initValue: filterCache ? 
          (filterCache['surveyStatus'] ? filterCache['surveyStatus'] : 4)
          : 4,
        options: [
          {value: 1, viewValue: '全部'},
          {value: 2, viewValue: '未验车'},
          {value: 3, viewValue: '首次验车完成未二次验车'},
          {value: 4, viewValue: '二次验车完成'}
        ]
      }
    ];

    this.filterValueChangesRxx.next({
      surveyStatus: this.optionsArr[0].initValue
    });

    this.filterValueChangesRxx.subscribe(v => {
      this.filteredData = this.calculateFilteredData(v.surveyStatus);
      this.filterCache['DismantlingIdleComponent'] = {surveyStatus: v.surveyStatus}

      // console.log(this.filteredData);
    });









  }




}
