import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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

  constructor() { }

  queryList(entranceWeek, vehicleType?) {
    const surveyStatus = (this.filterValueChangesRxx.getValue()).surveyStatus;
    const searchQuery = {entranceWeek};
    if (surveyStatus > 1) {
      searchQuery['status.firstSurvey.done'] = this.basedOnSurveyStatus[surveyStatus].firstSurvey;
      searchQuery['status.secondSurvey.done'] = this.basedOnSurveyStatus[surveyStatus].secondSurvey;
    }
    if (vehicleType) {
      searchQuery['vehicle.vehicleType'] = vehicleType;
    }
    console.log(searchQuery);
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
