import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdAutocompleteTrigger } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import { DataService } from '../../data/data.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { MdDialog } from '@angular/material';

import { DialogVehicleComponent } from '../dialog-vehicle/dialog-vehicle.component';
import { DialogVehicleListComponent } from '../dialog-vehicle-list/dialog-vehicle-list.component';


@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  stateCtrl: FormControl;
  sub: Subscription;
  listRxx = new BehaviorSubject(null);
  isLoading = false;
  @ViewChild(MdAutocompleteTrigger) trigger: MdAutocompleteTrigger;

  constructor(
    private data: DataService,
    private dialog: MdDialog
  ) {}

  ngOnInit() {
    this.stateCtrl = new FormControl();
    this.sub = this.stateCtrl.valueChanges
        .debounceTime(500)
        .filter(key => key && key.length)
        // .distinctUntilChanged()
        .do(() => this.listRxx.next(['搜索中...']))
        .switchMap(key => {
          // console.log(key);
          this.isLoading = true;
          return this.data.vehiclesSearch(key);
        })
        .catch(error => Observable.of({
          ok: false, error
        }))
        .subscribe(result => {
          this.isLoading = false;
          if (result.error) {
            console.error(result.error);
          } else {
            const listToDisplay = result.map(item => {
              let displayValue = '';
              switch (item.type) {
                case 'vp':
                  displayValue = '架牌号：' + item.displayValue;
                  break;
                case 'vb':
                  displayValue = '批次号：' + item.displayValue;
                  break;
                default:
                  displayValue = item.displayValue ? item.displayValue : '';
              }
              return displayValue;
            });
            this.listRxx.next(listToDisplay.length ? listToDisplay : ['无']);
          }
        });

  }
  ngAfterViewInit() {
    // reset ctrl after selection
    this.listRxx
      .filter(v => v)
      .delay(0) // without delay, the this.trigger.optionSelections will be obsolete
      .switchMap((list) => {
        // console.log(list);
        return this.trigger.optionSelections;
      })
      .subscribe(option => {
        // console.log(option);
        const selectedValue = option.source.value;
        switch (true) {
          case selectedValue.indexOf('架牌号：') === 0 && option.isUserInput:
            const slashPosition = selectedValue.indexOf(' /');
            const vin = selectedValue.slice(4, slashPosition);
            this.openDialogByVIN(vin);
            break;
          case selectedValue.indexOf('批次号：') === 0 && option.isUserInput:
            const batchId = selectedValue.slice(4);
            this.queryVehiclesByBatchId(batchId);
            break;
        }
        this.listRxx.next(null);
        this.stateCtrl.reset();
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openDialogByVIN(vin: string) {
    this.dialog.open(DialogVehicleComponent, {
      width: '80%',
      data: {
        vin
      }
    });
  }

  queryVehiclesByBatchId(batchId) {
    const searchQuery = {batchId}
    const dialogRef = this.dialog.open(DialogVehicleListComponent, {
      width: '80%',
      // disableClose: true,
      data: {
        searchQuery,
        source: '车辆查询',
        // types: this.zipData.types,
        // titles: this.zipData.titles,
        // vin: vehicleBrief.vin,
        // vehicleType: vehicleBrief.vehicle.vehicleType,
        // canCreateNew: !vehicleBrief.dismantling && !vehicleBrief.status.dismantled.done
      },
    });

    dialogRef.afterClosed().subscribe(v => {
      // if (v) {this.needUpdate.emit(true); }
      // this.needUpdate.emit(v);
    });


  }  


}
