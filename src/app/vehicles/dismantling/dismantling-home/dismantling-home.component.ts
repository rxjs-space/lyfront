import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../../data/data.service';
import { AsyncDataLoaderService } from '../../../shared/async-data-loader/async-data-loader.service';
import { AsyncMonitorService } from '../../../shared/async-monitor/async-monitor.service';

@Component({
  selector: 'app-dismantling-home',
  templateUrl: './dismantling-home.component.html',
  styleUrls: ['./dismantling-home.component.scss']
})
export class DismantlingHomeComponent implements OnInit, OnDestroy {

  asyncDataId = 'dismantlingHome' + Math.random();
  itemRxHash = {
    btity: this.data.btityRxx,
    reports: this.data.dismantlingOrderReports()
  };
  holder: any;
  dialogDismantlingOrderAsyncMonitorHolder: any;
  subscriptions: Subscription[] = [];

  constructor(
    private data: DataService,
    private asyncDataLoader: AsyncDataLoaderService,
    private asyncMonitor: AsyncMonitorService
  ) { }

  ngOnInit() {
    this.holder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
    this.holder.refreshAll();
    this.dialogDismantlingOrderAsyncMonitorHolder = this.asyncMonitor.init('dialogDismantlingOrder');
    const sub0_ = this.dialogDismantlingOrderAsyncMonitorHolder
      .subscribe(result => {
        if (result.value && result.value.result.ok) {
          // console.log('ready to refresh reports');
          this.holder.refreshByTitle('reports');
        }
      });
    this.subscriptions.push(sub0_);
  }

  ngOnDestroy() {
    this.holder.destroy();
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}
