import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdDialog } from '@angular/material';

import { DialogDismantlingOrderListComponent } from '../../../shared/dialog-dismantling-order-list/dialog-dismantling-order-list.component';

@Component({
  selector: 'app-dismantling-progressing',
  templateUrl: './dismantling-progressing.component.html',
  styleUrls: ['./dismantling-progressing.component.scss']
})
export class DismantlingProgressingComponent implements OnInit {
  @Input() data;
  @Input() filterCache;
  @Input() btity;
  @Input() orderType;
  filteredData;
  filterValueChangesRxx = new BehaviorSubject({dismantlingStarted: 1});
  optionsArr = [];
  title: string;
  dataProps = [ // dismantlingOrderWeek
    {title: '本周', name: 'thisWeek'},
    {title: '上周', name: 'lastWeek'},
    {title: '更早', name: 'evenEarlier'},
    {title: '合计', name: 'total'},
  ];

  basedOnDismantlingStarted = {
    '1': {
      sumPredicate: curr => {return true; },
    },
    '2': {
      sumPredicate: curr => {return curr['started']; },
    },
    '3': {
      sumPredicate: curr => {return !curr['started']; },
    },
  };

  constructor(
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    switch (this.orderType) {
      case 'dot1':
        this.title = '正常'; break;
      case 'dot3':
        this.title = '前期'; break;
    }
    const filterCache = this.filterCache['DismantlingProgressingComponent'];
    if (filterCache && filterCache['dismantlingStarted']) {
      this.filterValueChangesRxx.next({dismantlingStarted: filterCache['dismantlingStarted']});
    }
    this.filterValueChangesRxx.subscribe(v => {
      this.filteredData = this.calculateFilteredData(v.dismantlingStarted);
      filterCache ?
        filterCache['dismantlingStarted'] = v.dismantlingStarted :
        this.filterCache['DismantlingProgressingComponent'] = {dismantlingStarted: v.dismantlingStarted}
      // console.log(this.filteredData);
    });

    this.optionsArr = [
      {
        title: 'dismantlingStarted',
        placeholder: '拆解已开始',
        initValue: filterCache ? 
          (filterCache['dismantlingStarted'] ? filterCache['dismantlingStarted'] : 1)
          : 1,
        options: [
          {value: 1, viewValue: '全部'},
          {value: 2, viewValue: '是'},
          {value: 3, viewValue: '否'},
        ]
      }
    ];
  }

  calculateFilteredData(dismantlingStarted) {
    return this.data.reduce((acc, curr) => {
      if (curr.orderType === this.orderType) {
        const vehicleTypeIdsForMotocycle = this.btity['types']['vehicleTypeIdsForMotocycle'];
        const currType = vehicleTypeIdsForMotocycle.indexOf(curr['vehicleType']) > -1
          ? '摩托车' : '非摩托车';
        const obj = Object.assign({}, acc[currType]);
        for (const item of this.dataProps) {
          const name = item.name;  // name is week

          if (this.basedOnDismantlingStarted[dismantlingStarted].sumPredicate(curr)) {
            obj[name] = (acc[currType] ? (acc[currType][name] ? acc[currType][name] : 0) : 0) + curr[name];
          }
        }
        acc[currType] = Object.assign({}, obj);
      }
      return acc;
    }, {});
  }

  queryList(dismantlingOrderWeek, vehicleType?) {
    const dismantlingStarted = (this.filterValueChangesRxx.getValue()).dismantlingStarted;
    const searchQuery = {
      completed: false,
      orderType: this.orderType
    };
    if (dismantlingStarted > 1) {
      searchQuery['dismantlingStarted'] = dismantlingStarted === 2 ? true : false;
    }
    searchQuery['dismantlingOrderWeek'] = dismantlingOrderWeek;

    if (vehicleType) {
      searchQuery['vehicleType'] = vehicleType;
      // vehicleType here could be '2' or 'z', backend will deal with 'z'
    }
    // console.log(searchQuery);
    const dialogRef = this.dialog.open(DialogDismantlingOrderListComponent, {
      width: '80%',
      data: {
        searchQuery,
        source: '未完成拆解计划',
        dismantlingOrderWeek: (this.dataProps.find(dp => dp.name === dismantlingOrderWeek)).title,
        vehicleType
      }
    });


  }

}
