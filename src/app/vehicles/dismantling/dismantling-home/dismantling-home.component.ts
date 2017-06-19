import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService } from '../../../data/data.service';
import { AsyncDataLoaderService } from '../../../shared/async-data-loader/async-data-loader.service';

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

  constructor(
    private data: DataService,
    private asyncDataLoader: AsyncDataLoaderService,
  ) { }

  ngOnInit() {
    this.holder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
    this.holder.refreshAll();
  }

  ngOnDestroy() {
    this.holder.destroy();
  }

}
