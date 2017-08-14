import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DialogVehicleListComponent } from '../../../shared/dialog-vehicle-list/dialog-vehicle-list.component';

@Component({
  selector: 'app-dismantling-idle2',
  templateUrl: './dismantling-idle2.component.html',
  styleUrls: ['./dismantling-idle2.component.scss']
})
export class DismantlingIdle2Component implements OnInit {
  @Input() report;
  @Input() filterCache;
  @Input() btity;
  filteredData;
  optionsArr;
  dataProps = [
    {title: '本周', name: 'thisWeek'},
    {title: '上周', name: 'lastWeek'},
    {title: '更早', name: 'evenEarlier'},
    {title: '合计', name: 'total'},
  ];
  filterValueChangesRxx = new BehaviorSubject(null);

  basedOnSurveyStatus = {
    '1': {
      sumPredicate: curr => {return true; },
    },
    '2': { // isDismantlingReady
      sumPredicate: curr => {return curr['status2.isDismantlingReady']; },
    },
    '3': { // !isDismantlingReady
      sumPredicate: curr => {return !curr['status2.isDismantlingReady']; },
    },
  };

  constructor(
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    const filterCache = this.filterCache['DismantlingIdleComponent'];
    this.optionsArr = [
      {
        title: 'isDismantlingReady',
        placeholder: '可否拆解',
        initValue: filterCache ?
          (filterCache['isDismantlingReady'] ? filterCache['isDismantlingReady'] : 2)
          : 2,
        options: [
          {value: 1, viewValue: '全部'},
          {value: 2, viewValue: '可拆解'},
          {value: 3, viewValue: '不可拆解'},
        ]
      }
    ];
    this.filterValueChangesRxx.next({
      isDismantlingReady: this.optionsArr[0].initValue
    });

    this.filterValueChangesRxx.subscribe(v => {
      this.filteredData = this.calculateFilteredData(v);
      // console.log(this.filteredData);
      this.filterCache['DismantlingIdle2Component'] = {isDismantlingReady: v.isDismantlingReady}

    });

  }

  calculateFilteredData(filterValue) {
    const isDismantlingReady = filterValue['isDismantlingReady']; // this could be 1, 2 or 3;
    const vehicleTypeIdsForMotocycle = this.btity['types']['vehicleTypeIdsForMotocycle'];
    return this.report.reduce((acc, curr) => {
      const currType = vehicleTypeIdsForMotocycle.indexOf(curr['vehicle.vehicleType']) > -1
        ? '摩托车' : '非摩托车';
      const temp = Object.assign({}, acc[currType]);
      for (const item of this.dataProps) {
        const week = item.name;
        // if (predicates[caseValue](curr)) {
        if (this.basedOnSurveyStatus[isDismantlingReady].sumPredicate(curr)) {
          temp[week] = (acc[currType] ? (acc[currType][week] ? acc[currType][week] : 0) : 0) + curr[week];
        }
      }
      acc[currType] = Object.assign({}, temp);
      return acc;
    }, {});
  }

  queryList(entranceWeek, simpleVehicleType?) {
    const isDismantlingReady = (this.filterValueChangesRxx.getValue()).isDismantlingReady;
    const searchQuery = {
      entranceWeek,
      'status2.dismantlingOrderId': '',
      'status.dismantled.done': false
    };

    switch (isDismantlingReady) {
      case 2:
        searchQuery['status2.isDismantlingReady'] = true;
        break;
      case 3:
        searchQuery['status2.isDismantlingReady'] = false;
        break;
    }

    if (simpleVehicleType) {
      searchQuery['vehicle.vehicleType'] = simpleVehicleType;
      // vehicleType here could be '3' or 'z', backend will deal with 'z'
    }
    // console.log(searchQuery);
    const dialogRef = this.dialog.open(DialogVehicleListComponent, {
      width: '80%',
      // disableClose: true,
      data: {
        searchQuery,
        source: '未下达拆解计划车辆',
        isDismantlingReady: (this.optionsArr[0].options.find(op => op.value === isDismantlingReady)),
        entranceWeek: (this.dataProps.find(dp => dp.name === entranceWeek)).title,
        vehicleType: simpleVehicleType

        // types: this.zipData.types,
        // titles: this.zipData.titles,
        // vin: vehicleBrief.vin,
        // vehicleType: vehicleBrief.vehicle.vehicleType,
        // canCreateNew: !vehicleBrief.dismantling && !vehicleBrief.status.dismantled.done
      },
    });
  }

}
