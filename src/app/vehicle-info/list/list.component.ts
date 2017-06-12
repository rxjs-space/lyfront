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
  toShowFilters = false;
  filtersForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private data: DataService) { }

  ngOnInit() {
    this.data.getVehicles()
      .catch(error => Observable.of({
        ok: false,
        error
      }))
      .subscribe(data => {
        // console.log(data);
      this.vList = data;
    });

    this.filtersForm = this.fb.group({
      mofcomCertReady: false,
      firstSurvey: false,
      secondSurvey: false,
      dismantled: false,
      dismantling: false
    })
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
