import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DataService } from '../../data/data.service';
import { AsyncDataLoaderService } from '../async-data-loader/async-data-loader.service';
import { SubHolder } from '../async-data-loader/async-data-loader.service';
import { AsyncMonitorService } from '../async-monitor/async-monitor.service';
import { DialogMarkComponent } from './dialog-mark.component';

@Component({
  selector: 'app-dismantling-order-list',
  templateUrl: './dismantling-order-list.component.html',
  styleUrls: ['./dismantling-order-list.component.scss']
})
export class DismantlingOrderListComponent implements OnInit, OnDestroy {
  @Input() searchQuery: any;
  asyncDataId = 'dismantlingOrderList';
  itemRxHash = {
    btity: this.data.btityRxx,
    dismantlingOrders: null
  };
  holder: SubHolder;
  dialogDismantlingOrderMarkAsyncMonitorHolder: BehaviorSubject<any>;
  subscriptions: Subscription[] = [];
  dismantlingOrders: any[];
  constructor(
    public dialog: MdDialog,
    private data: DataService,
    private asyncDataLoader: AsyncDataLoaderService,
    private asyncMonitor: AsyncMonitorService
  ) { }

  ngOnInit() {
    // console.log(this.searchQuery);
    this.itemRxHash.dismantlingOrders = this.data.getDismantlingOrders(this.searchQuery);
    this.holder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
    this.holder.refreshAll();
    const sub0_ = this.holder.latestResultRxxHash['dismantlingOrders']
      .filter(v => v)
      .first()
      .subscribe(v => {
        this.dismantlingOrders = v;

          this.dialogDismantlingOrderMarkAsyncMonitorHolder = this.asyncMonitor.init('dialogDismantlingOrderMark');
          const sub1_ = this.dialogDismantlingOrderMarkAsyncMonitorHolder
            .filter(result => result.done && result.value)
            .subscribe(result => {
              if (!result.error) {
                const updatedDismantlingOrderId = result.value._id;
                const dismantlingIdArray = this.dismantlingOrders.map(dismantlingOrder => dismantlingOrder._id);
                const indexToReplace = dismantlingIdArray.indexOf(updatedDismantlingOrderId);
                this.dismantlingOrders[indexToReplace] = result.value;
              }
            });
            this.subscriptions.push(sub1_);
      });
    this.subscriptions.push(sub0_);

  }

  openDialogMark(markTarget, dismantlingOrder) {
    const dialogRef = this.dialog.open(DialogMarkComponent, {
      data: {
        markTarget,
        dismantlingOrder
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}

