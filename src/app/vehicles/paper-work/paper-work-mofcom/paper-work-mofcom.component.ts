import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { DataService } from '../../../data/data.service';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../shared/async-data-loader';
import { DialogVehicleListComponent } from '../../../shared/dialog-vehicle-list/dialog-vehicle-list.component';


@Component({
  selector: 'app-paper-work-mofcom',
  templateUrl: './paper-work-mofcom.component.html',
  styleUrls: ['./paper-work-mofcom.component.scss']
})
export class PaperWorkMofcomComponent extends BaseForComponentWithAsyncData implements OnInit {
  asyncDataHolderId = 'PaperWorkMofcomComponent';
  dataRxHash = {
    mofcomReport: this.backend.vehiclesReports('mofcom'),
    btity: this.backend.btityRxx
  };
  holderPub: SubHolder;
  filterCacheRxx = new BehaviorSubject({mofcomStatus: 2});
  filteredData: any;
  dataProps = [
    {title: '本周', name: 'thisWeek'},
    {title: '上周', name: 'lastWeek'},
    {title: '更早', name: 'evenEarlier'},
    {title: '合计', name: 'total'},
  ];
  basedOnMofcomStatus = {
    '1': {
      sumPredicate: curr => {return true; },
    },
    '2': {
      sumPredicate: curr => {return !curr['status.mofcomEntry.done']; },
      mofcomEntry: false, mofcomCertReady: false
    },
    '3': {
      sumPredicate: curr => {return curr['status.mofcomEntry.done'] && !curr['status.mofcomCertReady.done']},
      mofcomEntry: true, mofcomCertReady: false
    },
  };

  optionsArr = [
    {
      title: 'mofcomStatus',
      placeholder: '验车状态',
      initValue: this.filterCacheRxx.getValue()['mofcomStatus'],
      options: [
        {value: 1, viewValue: '全部'},
        {value: 2, viewValue: '回收证明未录入'},
        {value: 3, viewValue: '回收证明已录入、未打印'},
      ]
    }
  ];


  constructor(
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService,
    public dialog: MdDialog,
  ) {
    super(asyncDataLoader, backend);
   }

  ngOnInit() {
    super.ngOnInit();
    this.holderPub = this.holder;
    const sub0_ = (this.holder.isLoadedWithoutErrorRxx as Observable<boolean>)
      .filter(v => v)
      .switchMap(() => this.filterCacheRxx)
      .subscribe(v => {
        this.filteredData = this.calculateFilteredData(v.mofcomStatus);
      });
    this.subscriptions.push(sub0_);
  }

  calculateFilteredData(mofcomStatus) {
    // console.log(mofcomStatus);
    const data = this.holder.latestResultRxxHash['mofcomReport'].getValue();
    const vehicleTypeIdsForMotocycle = this.holder.latestResultRxxHash['btity'].getValue()['types']['vehicleTypeIdsForMotocycle'];
    return data.reduce((acc, curr) => {
      const currType = vehicleTypeIdsForMotocycle.indexOf(curr['vehicle.vehicleType']) > -1
        ? '摩托车' : '非摩托车';
      const obj = Object.assign({}, acc[currType]);
      for (const item of this.dataProps) {
        const name = item.name; // week
        // if (predicates[caseValue](curr)) {
        if (this.basedOnMofcomStatus[mofcomStatus].sumPredicate(curr)) {
          obj[name] = (acc[currType] ? (acc[currType][name] ? acc[currType][name] : 0) : 0) + curr[name];
        }
      }
      acc[currType] = Object.assign({}, obj);
      return acc;
    }, {});
  }


  queryList(entranceWeek, vehicleType?) {
    const mofcomStatus = (this.filterCacheRxx.getValue()).mofcomStatus;
    const searchQuery = {entranceWeek};
    searchQuery['status.mofcomCertReady.done'] = false;
    if (mofcomStatus > 1) {
      searchQuery['status.mofcomEntry.done'] = this.basedOnMofcomStatus[mofcomStatus].mofcomEntry;
      searchQuery['status.mofcomCertReady.done'] = this.basedOnMofcomStatus[mofcomStatus].mofcomCertReady;
    }
    if (vehicleType) {
      searchQuery['vehicle.vehicleType'] = vehicleType;
      // vehicleType here could be '3' or 'z', backend will deal with 'z'
    }
    const dialogRef = this.dialog.open(DialogVehicleListComponent, {
      width: '80%',
      // disableClose: true,
      data: {
        searchQuery,
        source: '回收证明待办车辆',
        mofcomStatus: (this.optionsArr[0].options.find(op => op.value === mofcomStatus)),
        entranceWeek: (this.dataProps.find(dp => dp.name === entranceWeek)).title,
        vehicleType
      },
    });

    dialogRef.afterClosed().subscribe(v => {
      // if (v) {this.needUpdate.emit(true); }
      // this.needUpdate.emit(v);
    });

  }



  // mofcomNewVehicle() {
  //   const vehicle = {
  //     mofcomRegisterType: '1',
  //     owner: {
  //       name: 'xyz',
  //       isPerson: false,
  //       idNo: '123',
  //       tel: '0421',
  //       address: '双塔区',
  //       zipCode: '122000'
  //     },
  //     agent: {
  //       name: 'agent',
  //       idNo: '890'
  //     },
  //     vehicle: {
  //       vehicleType: '3',
  //     }
  //   }
  //   this.backend.mofcomNewVehicle(vehicle)
  //     .catch(error => Observable.of({
  //       ok: false, error
  //     }))
  //     .subscribe(res => {
  //       if (res.error) {
  //         switch (true) {
  //           case res.error.message.indexOf('not logged in') > -1 || res.error.message.indxOf('loggin expired') > -1:
  //             this.isLoggedIn = false;
  //             this.mofcomInit();
  //             break;
  //         }
  //         console.log(res.error)
  //       } else {
  //         console.log(res)
  //       }
  //     });
  // }


}
