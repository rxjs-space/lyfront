import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../data/data.service';
import { AsyncDataLoaderService, SubHolder } from '../async-data-loader/async-data-loader.service';

@Component({
  selector: 'app-dialog-dismantling-order-print',
  templateUrl: './dialog-dismantling-order-print.component.html',
  styleUrls: ['./dialog-dismantling-order-print.component.scss']
})
export class DialogDismantlingOrderPrintComponent implements OnInit, OnDestroy {
  asyncDataLoaderId = 'DialogDismantlingOrderPrintComponent' + Math.random();
  itemRxHash = {
    btity: this.data.btityRxx,
    vehicle: this.data.getVehicleByVIN(this.dataFromTrigger.dismantlingOrder.vin),
    // vehicle: this.data.getVehicleByVIN('pp')
  };
  holder: SubHolder;
  elementHash: {[key: string]: any} = {};

  constructor(
    private asyncDataLoader: AsyncDataLoaderService,
    private data: DataService,
    public dialogRef: MdDialogRef<DialogDismantlingOrderPrintComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
  ) { }

  

  ngOnInit() {
    this.holder = this.asyncDataLoader.init(this.asyncDataLoaderId, this.itemRxHash);
    this.holder.refreshAll();
    this.preparePrint();
  }

  ngOnDestroy() {
    this.rollbackPreparePrint();
    this.holder.destroy();

  }


  /**
   * 1) set <dialog-container>'s overflow to visible, visibility to visible
   * 2) set <html>'s position to initial, visibility to hidden
   * 3) set <overlay-container>'s position to initial
   */
  preparePrint() {
    console.log('preparing to print');
    this.elementHash['htmlElement'] = document.querySelector('html');
    this.elementHash['htmlElement'].classList.add('prepare-print-html');
    this.elementHash['bodyElement'] = document.querySelector('body');
    this.elementHash['bodyElement'].classList.add('prepare-print-body');

    this.elementHash['dialogDOP'] = document.querySelector('app-dialog-dismantling-order-print');
    this.elementHash['dialogContainerElement'] = this.elementHash['dialogDOP'].parentElement;
    this.elementHash['dialogContainerElement'].classList.add('prepare-print-dialog-container');

    this.elementHash['overlayContainerElement'] = document.querySelector('.cdk-overlay-container');
    this.elementHash['overlayContainerElement'].classList.add('prepare-print-overlay-container');
    // this.elementHash['dialogContentElement'] = document.querySelector('app-dialog-dismantling-order-print [md-dialog-content]');
    // this.elementHash['dialogContentElement'].classList.add('prepare-print-dialog-content');
  }

  rollbackPreparePrint() {
    this.elementHash['htmlElement'].classList.remove('prepare-print-html');
    this.elementHash['bodyElement'].classList.remove('prepare-print-body');
    this.elementHash['dialogContainerElement'].classList.remove('prepare-print-dialog-container');
    this.elementHash['overlayContainerElement'].classList.remove('prepare-print-overlay-container');
    // this.elementHash['dialogContentElement'].classList.remove('prepare-print-dialog-content');
  }


}
