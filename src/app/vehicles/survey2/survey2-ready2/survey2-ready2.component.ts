import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../shared/async-data-loader';
import { MdDialog } from '@angular/material';
import { DialogVehicleListComponent } from '../../../shared/dialog-vehicle-list/dialog-vehicle-list.component';
import { DataService } from '../../../data/data.service';
import { EventListenersService, SubjectWithRemove } from '../../../shared/event-listeners/event-listeners.service';
@Component({
  selector: 'app-survey2-ready2',
  templateUrl: './survey2-ready2.component.html',
  styleUrls: ['./survey2-ready2.component.scss']
})
export class Survey2Ready2Component extends BaseForComponentWithAsyncData implements OnInit, OnDestroy {
  asyncDataHolderId = 'Survey2Ready2Component';
  dataRxHash = {
    reports: this.backend.vehiclesReports('surveyIdle3'),
    btity: this.backend.btityRxx
  };
  holderPub: SubHolder;
  listenerRxx: SubjectWithRemove<any>;
  constructor(
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

    this.listenerRxx = this.el.add('Survey2Ready2Component');
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
