import { OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../../data/data.service';
import { AsyncDataLoaderService, SubHolder } from './async-data-loader.service';

export abstract class BaseForComponentWithAsyncData implements OnInit, OnDestroy {
  abstract asyncDataHolderId: string;
  protected holder: SubHolder;
  abstract dataRxHash: {
    [key: string]: Observable<any>
  };
  protected subscriptions: Subscription[] = [];

  constructor(
    protected asyncDataLoader: AsyncDataLoaderService,
    protected backend: DataService
  ) {}

  ngOnInit() {
    this.reset();
  }

  reset() {
    const currSubHolder = this.asyncDataLoader.holder[this.asyncDataHolderId];
    if (currSubHolder) {
      currSubHolder.destroy();
    }
    this.holder = this.asyncDataLoader.init(this.asyncDataHolderId, this.dataRxHash);
    this.holder.refreshAll();
  }

  ngOnDestroy() {
    this.holder.destroy();
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}
