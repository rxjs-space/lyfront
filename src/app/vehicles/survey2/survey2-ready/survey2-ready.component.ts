import { Component, OnInit } from '@angular/core';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../shared/async-data-loader';
import { MdDialog } from '@angular/material';
import { DialogVehicleListComponent } from '../../../shared/dialog-vehicle-list/dialog-vehicle-list.component';
import { DataService } from '../../../data/data.service';
import { AsyncMonitorService } from '../../../shared/async-monitor/async-monitor.service';

@Component({
  selector: 'app-survey2-ready',
  templateUrl: './survey2-ready.component.html',
  styleUrls: ['./survey2-ready.component.scss']
})

export class Survey2ReadyComponent extends BaseForComponentWithAsyncData implements OnInit {
  asyncDataHolderId = 'Survey2ReadyComponent';
  dataRxHash = {
    reports: this.backend.vehiclesReports('surveyIdle2'),
    btity: this.backend.btityRxx
  };
  holderPub: SubHolder;
  constructor(
    private asyncMonitor: AsyncMonitorService,
    public dialog: MdDialog,
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService
  ) {
    super(asyncDataLoader, backend);
  }

  ngOnInit() {
    super.ngOnInit();
    this.holderPub = this.holder;
    const sub0_ = this.asyncMonitor.init('dialogVehicleList')
      .filter(r => r.done)
      .subscribe(r => {
        if (!r.error) {
          this.holderPub.refreshByTitle('reports');
        }
      });

    this.subscriptions.push(sub0_);
  }

  onOpenDialogVehicleList(data) {
    this.dialog.open(DialogVehicleListComponent, {
      width: '80%',
      data
    });
  }

}
