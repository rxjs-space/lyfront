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

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  stateCtrl: FormControl;
  filteredStates: any;
  sub: Subscription;
  listRxx = new BehaviorSubject(null);
  isLoading = false;
  @ViewChild(MdAutocompleteTrigger) trigger: MdAutocompleteTrigger;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
        .debounceTime(500)
        .filter(key => key)
        .distinctUntilChanged()
        .do(() => this.listRxx.next(['搜索中...']))
        .switchMap(key => {
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
      .subscribe(() => {
        this.stateCtrl.reset();
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
