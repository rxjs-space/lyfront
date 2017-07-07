import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../shared/async-data-loader';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-admin-parts-and-wastes',
  templateUrl: './admin-parts-and-wastes.component.html',
  styleUrls: ['./admin-parts-and-wastes.component.scss']
})
export class AdminPartsAndWastesComponent extends BaseForComponentWithAsyncData implements OnInit, OnDestroy  {
  asyncDataHolderId = 'AdminPartsAndWastesComponent';
  dataRxHash = {
    btity: this.backend.btityRxx
  };

  constructor(
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService
  ) {
    super(asyncDataLoader, backend);
   }

  // ngOnInit() {
  //   super.ngOnInit();
  // }

}
