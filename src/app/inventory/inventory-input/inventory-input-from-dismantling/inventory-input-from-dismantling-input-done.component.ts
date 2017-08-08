import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../shared/async-data-loader';
import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-inventory-input-from-dismantling-input-done',
  templateUrl: './inventory-input-from-dismantling-input-done.component.html',
  styleUrls: ['./inventory-input-from-dismantling-input-done.component.scss']
})
export class InventoryInputFromDismantlingInputDoneComponent extends BaseForComponentWithAsyncData implements OnInit {
  asyncDataHolderId = 'InventoryInputFromDismantlingInputDoneComponent';
  daysToReport = 10;
  dataRxHash = {
    inputDonePWs: this.backend.getInputDone(this.daysToReport),
    btity: this.backend.btityRxx
  };
  holderPub: SubHolder;
  report: any;
  constructor(
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService
  ) {
    super(asyncDataLoader, backend);
  }

  calculateDatesToReport() {
    const datesToReport = [];
    const oneDayMS = 1000 * 60 * 60 * 24;
    const todayMS = Date.now();
    for (let i = 0; i < this.daysToReport; i++) {
      const daysAgoDate = new Date(Date.now() - (oneDayMS * i)).toISOString().slice(0, 10);
      datesToReport.unshift(daysAgoDate);
    }
    return datesToReport;
  }

  ngOnInit() {
    super.ngOnInit();
    this.holderPub = this.holder;
    const datesToReport = this.calculateDatesToReport();
    (this.holderPub.isLoadedWithoutErrorRxx as Observable<boolean>)
      .filter(v => v)
      .subscribe(() => {
        const rawReport: any[] = this.holderPub.latestResultRxxHash['inputDonePWs'].getValue();
        rawReport.reduce(r => {

        }, [])
      });
  }

}
