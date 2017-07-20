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
  filterValueChangesRxx = new BehaviorSubject({isAdHoc: 2});
  optionsArr = [];

  constructor(
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    const filterCache = this.filterCache['DismantlingCompletedComponent'];
    if (filterCache && filterCache['isAdHoc']) {
      this.filterValueChangesRxx.next({isAdHoc: filterCache['isAdHoc']});
    }

    this.optionsArr = [
      {
        title: 'isAdHoc',
        placeholder: '计划类别',
        // initValue - if no record in cache, use 2, that is non-adHoc orders
        initValue: filterCache ? 
          (filterCache['isAdHoc'] ? filterCache['isAdHoc'] : 2)
          : 2,
        options: [
          {value: 1, viewValue: '全部'},
          {value: 2, viewValue: '正常计划'},
          {value: 3, viewValue: '临时计划'},
        ]
      }
    ];

    this.filterValueChangesRxx.subscribe(v => {
      this.filteredData = this.calculateFilteredData(v);
      filterCache ?
        filterCache['isAdHoc'] = v.isAdHoc :
        this.filterCache['DismantlingCompletedComponent'] = {isAdHoc: v.isAdHoc}
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
      switch (filterValue.isAdHoc) {
        case 2:
          if (!curr.isAdHoc) {totalToAdd = curr.total; }
          break;
        case 3:
          if (curr.isAdHoc) {totalToAdd = curr.total; }
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
