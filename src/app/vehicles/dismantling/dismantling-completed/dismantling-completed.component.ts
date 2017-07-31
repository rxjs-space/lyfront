import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdDialog } from '@angular/material';
import { DialogDismantlingOrderListComponent } from '../../../shared/dialog-dismantling-order-list/dialog-dismantling-order-list.component';

@Component({
  selector: 'app-dismantling-completed',
  templateUrl: './dismantling-completed.component.html',
  styleUrls: ['./dismantling-completed.component.scss']
})
export class DismantlingCompletedComponent implements OnInit {
  @Input() data;
  @Input() filterCache;
  @Input() btity;
  filteredData: any;
  filterValueChangesRxx = new BehaviorSubject({orderType: 'dot1'});
  optionsArr = [];

  constructor(
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    const filterCache = this.filterCache['DismantlingCompletedComponent'];
    if (filterCache && filterCache['orderType']) {
      this.filterValueChangesRxx.next({orderType: filterCache['orderType']});
    }

    this.optionsArr = [
      {
        title: 'orderType',
        placeholder: '计划类别',
        initValue: filterCache ?
          (filterCache['orderType'] ? filterCache['orderType'] : 'dot1')
          : 'dot1',
        options: [
          {value: 'dot0', viewValue: '全部'},
          {value: 'dot1', viewValue: '正常计划'},
          {value: 'dot2', viewValue: '临时计划'},
          {value: 'dot3', viewValue: '前期计划'},
        ]
      }
    ];

    this.filterValueChangesRxx.subscribe(v => {
      this.filteredData = this.calculateFilteredData(v);
      filterCache ?
        filterCache['orderType'] = v.orderType :
        this.filterCache['DismantlingCompletedComponent'] = {orderType: v.orderType}
      // console.log(this.filteredData);
    });



  }

  lastDays(count = 10) {
    const today = (new Date());
    const onedayMS = 1000 * 60 * 60 * 24;
    const lastDays = [];
    for (let i = 0; i < count; i++) {
      lastDays[i] = (new Date(Date.parse(today.toString()) - onedayMS * (count - 1 - i))).toISOString().slice(0, 10);
    }
    return lastDays;
  }
  /**
   * acc looks like:
   * {'摩托车': [{completedDate: '', 'total': 0}], '非摩托车': [], 'max': 0}
   * 
   */
  calculateFilteredData(filterValue) {
    const reportsPrepared = this.lastDays(10).reduce((acc, curr) => {
      acc['非摩托车'].push({
        completedDate: curr, total: 0
      });
      acc['摩托车'].push({
        completedDate: curr, total: 0
      });
      return acc;
    }, {'非摩托车': [], '摩托车': [], 'max': 10});

    this.data.reduce((acc, curr) => {
      // console.log(curr);
      const vehicleTypeIdsForMotocycle = this.btity['types']['vehicleTypeIdsForMotocycle'];
      const key = vehicleTypeIdsForMotocycle.indexOf(curr['vehicleType']) > -1
        ? '摩托车' : '非摩托车';

      const itemToReplace = acc[key].find(item => item.completedDate === curr.completedDate);
      // console.log(itemToReplace);
      let totalToAdd = 0;
      switch (true) {
        case filterValue.orderType !== 'dot0':
          if (curr.orderType === filterValue.orderType) {totalToAdd = curr.total; }
          break;
        default:
          totalToAdd = curr.total;
      }
      itemToReplace.total += totalToAdd;
      if (curr.total > acc.max) {acc.max = curr.total; }
      return acc;
    }, reportsPrepared);
    return reportsPrepared;

  }

  queryList(vehicleType, completedDate) {
    const searchQuery = {vehicleType, completedDate};

    const dialogRef = this.dialog.open(DialogDismantlingOrderListComponent, {
      width: '80%',
      data: {
        searchQuery,
        source: '已完成拆解计划',
        completedDate,
        vehicleType
      }
    });

  }

}
