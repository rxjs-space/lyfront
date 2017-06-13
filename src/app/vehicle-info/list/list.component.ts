import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataService } from '../../data/data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  vList: any;
  toShowFilters = true;
  filtersForm: FormGroup;

  mofcomCertStatusOptions = [
    {value: 1, viewValue: '忽略'},
    {value: 2, viewValue: '未录入'},
    {value: 3, viewValue: '已录入未打印'},
    {value: 4, viewValue: '已打印'}
  ];
  surveyStatusOptions = [
    {value: 1, viewValue: '忽略'},
    {value: 2, viewValue: '未验车'},
    {value: 3, viewValue: '一次验车未二次验车'},
    {value: 4, viewValue: '二次验车'}
  ];
  dismantlingStatusOptions = [
    {value: 1, viewValue: '忽略'},
    {value: 2, viewValue: '待拆解'},
    {value: 3, viewValue: '拆解中'},
    {value: 4, viewValue: '彻底拆解'}
  ];

  constructor(
    private fb: FormBuilder,
    private data: DataService) { }

  ngOnInit() {
    this.getVehicles();

    // this.vList = [];

    this.filtersForm = this.fb.group({
      mofcomCertStatus: 1,
      surveyStatus: 1,
      dismantlingStatus: 1
    });


  }

  getVehicles(searchParams = {}) {
    this.vList = null;
    this.data.getVehicles(searchParams)
      .catch(error => Observable.of({
        ok: false,
        error
      }))
      .subscribe(data => {
        // console.log(data);
      this.vList = data;
    });
  }

  onFiltersFormSubmit() {
    const formValue = this.filtersForm.value;
    const searchParams = {};
    switch (formValue.mofcomCertStatus) {
      case 1:
        break;
      case 2:
        searchParams['status.mofcomEntry.done'] = false;
        break;
      case 3:
        searchParams['status.mofcomEntry.done'] = true;
        searchParams['status.mofcomCertReady.done'] = false;
        break;
      case 4:
        searchParams['status.mofcomCertReady.done'] = true;
        break;
    }
    switch (formValue.surveyStatus) {
      case 1:
        break;
      case 2:
        searchParams['status.firstSurvey.done'] = false;
        break;
      case 3:
        searchParams['status.firstSurvey.done'] = true;
        searchParams['status.secondSurvey.done'] = false;
        break;
      case 4:
        searchParams['status.secondSurvey.done'] = true;
        break;
    }
    switch (formValue.dismantlingStatus) {
      case 1:
        break;
      case 2:
        searchParams['dismantling'] = false;
        searchParams['status.dismantled.done'] = false;
        break;
      case 3:
        searchParams['dismantling'] = true;
        break;
      case 4:
        searchParams['status.dismantled.done'] = true;
        break;
    }
    console.log(searchParams);
    this.getVehicles(searchParams);


  }



  calculateDimantlingStatus(latestDismantlingOrder: {orderDate: any, actualFinishDate: any}) {
    let dStatus;
    switch (true) {
      case !latestDismantlingOrder:
        dStatus = '计划未下达';
        break;
      case !!latestDismantlingOrder && !!latestDismantlingOrder.actualFinishDate:
        dStatus = '完成';
        break;
      case !!latestDismantlingOrder && !!latestDismantlingOrder.orderDate:
        dStatus = '进行中';
        break;
    }
    return dStatus;
  }

}
