import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../shared/async-data-loader';
import { MdDialog } from '@angular/material';
import { DialogVehicleListComponent } from '../../../shared/dialog-vehicle-list/dialog-vehicle-list.component';
import { DataService } from '../../../data/data.service';
import { AsyncMonitorService } from '../../../shared/async-monitor/async-monitor.service';
import { EventListenersService, SubjectWithRemove } from '../../../shared/event-listeners/event-listeners.service';

@Component({
  selector: 'app-survey2-ready',
  templateUrl: './survey2-ready.component.html',
  styleUrls: ['./survey2-ready.component.scss']
})

export class Survey2ReadyComponent extends BaseForComponentWithAsyncData implements OnInit, OnDestroy {
  asyncDataHolderId = 'Survey2ReadyComponent';
  dataRxHash = {
    reports: this.backend.vehiclesReports('surveyIdle2'),
    btity: this.backend.btityRxx
  };
  holderPub: SubHolder;
  listenerRxx: SubjectWithRemove<any>;
  constructor(
    private asyncMonitor: AsyncMonitorService,
    public dialog: MdDialog,
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService,
    private el: EventListenersService
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
    this.listenerRxx = this.el.add('Survey2ReadyComponent');
    const sub1_ = this.listenerRxx.subscribe(event => {
      this.holderPub.refreshByTitle('reports');
    });
    this.subscriptions.push(sub1_);
  }

  onOpenDialogVehicleList(data) {
    this.dialog.open(DialogVehicleListComponent, {
      width: '80%',
      data
    });
  }

  ngOnDestroy() {
    this.listenerRxx.remove();
  }
}
