import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../shared/async-data-loader';
import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-inventory-input-from-dismantling-input-ready',
  templateUrl: './inventory-input-from-dismantling-input-ready.component.html',
  styleUrls: ['./inventory-input-from-dismantling-input-ready.component.scss']
})
export class InventoryInputFromDismantlingInputReadyComponent extends BaseForComponentWithAsyncData implements OnInit {
  asyncDataHolderId = 'InventoryInputFromDismantlingInputReadyComponent';
  dataRxHash = {
    inputReadyDOs: this.backend.getInputReadyDismantlingOrders(),
    btity: this.backend.btityRxx
  };
  holderPub: SubHolder;
  dismantlingOrderGroups = [
    {
      title: '正常拆解计划',
      value: []
    },
    {
      title: '前期拆解计划',
      value: []
    }
  ];
  buttonTitle: string;
  constructor(
    public dialog: MdDialog,
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService
  ) {
    super(asyncDataLoader, backend);
  }

  ngOnInit() {
    super.ngOnInit();
    this.holderPub = this.holder;
    const sub0_ = (this.holderPub.isLoadedWithoutErrorRxx as Observable<boolean>)
      .filter(v => v)
      .subscribe(() => {
        const inputReadyDOs = this.holderPub.latestResultRxxHash['inputReadyDOs'].getValue();
        this.dismantlingOrderGroups[0].value = inputReadyDOs.filter(DO => DO.orderType === 'dot1');
        this.dismantlingOrderGroups[1].value = inputReadyDOs.filter(DO => DO.orderType === 'dot3');
      });

    // this.holderPub.latestResultRxxHash['inputReadyDOs']
    //   .filter(v => v)
    //   .subscribe(DOs => {
    //     this.dismantlingOrderGroups[0].value = DOs.filter(DO => DO.orderType === 'dot1');
    //     this.dismantlingOrderGroups[1].value = DOs.filter(DO => DO.orderType === 'dot3');
    //   });
    this.subscriptions.push(sub0_);
  }

}
