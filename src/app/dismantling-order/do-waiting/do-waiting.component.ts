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
  filterValueChanges = new BehaviorSubject({surveyStatus: 1});

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

  constructor() { }

  ngOnInit() {
    this.filterValueChanges.subscribe(v => {
      switch (v.surveyStatus) {
        case 1:
          this.filteredData = this.data.reduce((acc, curr) => {
            acc[curr['vehicle.vehicleType']] = {
              thisWeek: acc[curr['vehicle.vehicleType']] || 0 + curr['thisWeek'],
              lastWeek: acc[curr['vehicle.vehicleType']] || 0 + curr['lastWeek'],
              evenEarlier: acc[curr['vehicle.vehicleType']] || 0 + curr['evenEarlier'],
              total: acc[curr['vehicle.vehicleType']] || 0 + curr['total'],
            };
            return acc;
          }, {});
          break;
      }
      console.log(this.filteredData);
    });
    // console.log(this.data);
  }


}
