import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DataService } from '../../data/data.service';
import { FormUtilsService } from '../form-utils/form-utils.service';
import { AsyncDataLoaderService } from '../async-data-loader/async-data-loader.service';
import { SubHolder } from '../async-data-loader/async-data-loader.service';
import { AsyncMonitorService } from '../async-monitor/async-monitor.service';
import { DialogMarkComponent } from './dialog-mark.component';
import { DialogVehicleComponent } from '../dialog-vehicle/dialog-vehicle.component';

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
    private asyncMonitor: AsyncMonitorService,
    private fu: FormUtilsService
  ) { }

  ngOnInit() {
    // console.log(this.searchQuery);
    this.itemRxHash.dismantlingOrders = this.data.getDismantlingOrders(this.searchQuery);
    this.holder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
    this.holder.refreshAll();
    const sub0_ = (this.holder.isLoadedWithoutErrorRxx as Observable<boolean>)
      .filter(v => v)
      .subscribe(v => {
        this.dismantlingOrders = this.holder.latestResultRxxHash['dismantlingOrders'].getValue();
        const btity = this.holder.latestResultRxxHash['btity'].getValue();
        this.dismantlingOrders.forEach(DOx => {
          DOx.productionOperators.forEach((operator, index) => {
            DOx.productionOperators[index] = this.fu.idToName(operator, btity.staffs, 'displayName');
          });
        });
        // console.log(this.dismantlingOrders);

          // this.dialogDismantlingOrderMarkAsyncMonitorHolder = this.asyncMonitor.init('dialogDismantlingOrderMark');
          // const sub1_ = this.dialogDismantlingOrderMarkAsyncMonitorHolder
          //   .filter(result => result.done && result.value)
          //   .subscribe(result => {
          //     if (!result.error) {
          //       const updatedDismantlingOrderId = result.value._id;
          //       const dismantlingIdArray = this.dismantlingOrders.map(dismantlingOrder => dismantlingOrder._id);
          //       const indexToReplace = dismantlingIdArray.indexOf(updatedDismantlingOrderId);
          //       this.dismantlingOrders[indexToReplace] = result.value;
          //     }
          //   });
          //   this.subscriptions.push(sub1_);
      });
    this.subscriptions.push(sub0_);

  }

  openDialogVehicle(vin) {
    this.dialog.open(DialogVehicleComponent, {
      // width: '80%',
      height: '100%',
      // panelClass: '',
      disableClose: true,
      data: {
        types: this.holder.latestResultRxxHash['btity'].getValue()['types'],
        titles: this.holder.latestResultRxxHash['btity'].getValue()['titles'],
        vin,
      }
    })
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


