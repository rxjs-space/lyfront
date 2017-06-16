import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdDialog } from '@angular/material';

import { DialogVehicleListComponent } from '../../shared/dialog-vehicle-list/dialog-vehicle-list.component';

@Component({
  selector: 'app-do-waiting',
  templateUrl: './do-waiting.component.html',
  styleUrls: ['./do-waiting.component.scss']
})
export class DoWaitingComponent implements OnInit {
  @Input() data;
  filteredData;
  filterValueChangesRxx = new BehaviorSubject({surveyStatus: 1});

  optionsArr = [
    {
      title: 'surveyStatus',
      placeholder: '验车状态',
      options: [
        {value: 1, viewValue: '全部'},
        {value: 2, viewValue: '未验车'},
        {value: 3, viewValue: '一次验车未二次验车'},
        {value: 4, viewValue: '二次验车'}
      ]
    }
  ];

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
      sumPredicate: curr => {return curr['status.firstSurvey.done'] && !curr['status.secondSurvey.done']},
      firstSurvey: true, secondSurvey: true
    },
  };

  constructor(
    public dialog: MdDialog,
  ) { }

  queryList(entranceWeek, vehicleType?) {
    const surveyStatus = (this.filterValueChangesRxx.getValue()).surveyStatus;
    const searchQuery = {entranceWeek};
    searchQuery['dismantling'] = false;
    searchQuery['status.dismantled.done'] = false;
    if (surveyStatus > 1) {
      searchQuery['status.firstSurvey.done'] = this.basedOnSurveyStatus[surveyStatus].firstSurvey;
      searchQuery['status.secondSurvey.done'] = this.basedOnSurveyStatus[surveyStatus].secondSurvey;
    }
    if (vehicleType) {
      searchQuery['vehicle.vehicleType'] = vehicleType;
    } else {
      vehicleType = '全部' // this '全部' has no corresponding serachQuery
    }
    // console.log(searchQuery);
    const dialogRef = this.dialog.open(DialogVehicleListComponent, {
      width: '650px',
      data: {
        searchQuery,
        source: '待拆车辆',
        surveyStatus: (this.optionsArr[0].options.find(op => op.value === surveyStatus)).viewValue,
        entranceWeek: (this.dataProps.find(dp => dp.name === entranceWeek)).title,
        vehicleType

        // types: this.zipData.types,
        // titles: this.zipData.titles,
        // vin: vehicleBrief.vin,
        // vehicleType: vehicleBrief.vehicle.vehicleType,
        // canCreateNew: !vehicleBrief.dismantling && !vehicleBrief.status.dismantled.done
      },
    });

  }

  calculateFilteredData(surveyStatus) {
    const predicates = {
      '1': curr => {return true; },
      '2': curr => {return !curr['status.firstSurvey.done'] && !curr['status.secondSurvey.done']},
      '3': curr => {return curr['status.firstSurvey.done'] && !curr['status.secondSurvey.done']},
      '4': curr => {return curr['status.secondSurvey.done']},
    };
    return this.data.reduce((acc, curr) => {
      const currType = curr['vehicle.vehicleType'];
      const obj = {};
      for (const item of this.dataProps) {
        const name = item.name;
        // if (predicates[caseValue](curr)) {
        if (this.basedOnSurveyStatus[surveyStatus].sumPredicate(curr)) {
          obj[name] = (acc[currType] ? (acc[currType][name] ? acc[currType][name] : 0) : 0) + curr[name];
        }
      }
      acc[curr['vehicle.vehicleType']] = Object.assign({}, obj);
      return acc;
    }, {});
  }

  ngOnInit() {
    this.filterValueChangesRxx.subscribe(v => {
      this.filteredData = this.calculateFilteredData(v.surveyStatus);
      // console.log(this.filteredData);
    });
    // console.log(this.data);
  }


}
