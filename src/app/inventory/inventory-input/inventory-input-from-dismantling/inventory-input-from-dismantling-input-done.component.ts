import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../shared/async-data-loader';
import { TimeCalculationService } from '../../../shared/time-calculation/time-calculation.service';
import { FormUtilsService } from '../../../shared/form-utils/form-utils.service';
import { DataService } from '../../../data/data.service';
import { EventListenersService } from '../../../shared/event-listeners/event-listeners.service';

@Component({
  selector: 'app-inventory-input-from-dismantling-input-done',
  templateUrl: './inventory-input-from-dismantling-input-done.component.html',
  styleUrls: ['./inventory-input-from-dismantling-input-done.component.scss']
})
export class InventoryInputFromDismantlingInputDoneComponent extends BaseForComponentWithAsyncData implements OnDestroy, OnInit {
  asyncDataHolderId = 'InventoryInputFromDismantlingInputDoneComponent';
  daysToReport = 10;
  dataRxHash = {
    inputDonePWs: this.backend.getInputDone(this.daysToReport),
    btity: this.backend.btityRxx
  };
  btity: any;
  holderPub: SubHolder;
  tableDataSource = new InventoryInputDoneReport(this.backend);
  tableColumns = ['typeId', 'total'];
  dates: any[];
  listenerRxx = this.el.add('InventoryInputFromDismantlingInputDoneComponent');
  constructor(
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService,
    private tc: TimeCalculationService,
    public fu: FormUtilsService,
    private el: EventListenersService
  ) {
    super(asyncDataLoader, backend);
  }

  ngOnInit() {
    super.ngOnInit();
    this.holderPub = this.holder;
    this.dates = this.calculateDates();
    this.tableColumns = this.tableColumns.concat(this.dates.reverse());
    const sub0_ = (this.holderPub.isLoadedWithoutErrorRxx as Observable<boolean>)
      .filter(v => v)
      .subscribe(() => {
        this.btity = this.holderPub.latestResultRxxHash['btity'].getValue();
        // const rawReport = this.holderPub.latestResultRxxHash['inputDonePWs'].getValue();

      });

    const sub1_ = this.listenerRxx.subscribe(event => {
      this.holder.refreshByTitle('inputDonePWs');
    });
    this.subscriptions.push(sub0_, sub1_);

  }

  calculateDates() {
    const dates = [];
    const today = new Date();
    for (let i = 9; i >= 0; i--) {
      const date = this.tc.getDaysAgoDate(today, i);
      dates.push(date);
    };
    return dates;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.listenerRxx.remove();
  }
}

export class InventoryInputDoneReport extends DataSource<any> {
  constructor(private backend: DataService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return this.backend.inventoryInputDoneRxx
      .do(console.log)
      .filter(r => r.isFromDismantling)
      .map(r => {
        return r.isFromDismantling.sort((a, b) => a.typeId > b.typeId)
      });
  }

  disconnect() {}
}
