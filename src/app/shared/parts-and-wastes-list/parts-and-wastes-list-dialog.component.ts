import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-parts-and-wastes-list-dialog',
  templateUrl: './parts-and-wastes-list-dialog.component.html',
  styleUrls: ['./parts-and-wastes-list-dialog.component.scss']
})
export class PartsAndWastesListDialogComponent implements OnInit, OnDestroy {
  elementHash: {[key: string]: any} = {};
  isInPrintMode = false;
  constructor(
    public dialogRef: MdDialogRef<PartsAndWastesListDialogComponent>,
  ) { }

  ngOnInit() {
    this.preparePrint();
  }

  ngOnDestroy() {
    this.rollbackPreparePrint();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  preparePrint() {
    console.log('preparing to print');
    this.elementHash['htmlElement'] = document.querySelector('html');
    this.elementHash['htmlElement'].classList.add('prepare-print-html');
    this.elementHash['bodyElement'] = document.querySelector('body');
    this.elementHash['bodyElement'].classList.add('prepare-print-body');

    this.elementHash['dialogElement'] = document.querySelector('app-parts-and-wastes-list-dialog');
    this.elementHash['dialogContainerElement'] = this.elementHash['dialogElement'].parentElement;
    this.elementHash['dialogContainerElement'].classList.add('prepare-print-dialog-container');

    // this.elementHash['dialogContentElement'] = document.querySelector('app-dialog-vehicle .mat-dialog-content');
    // this.elementHash['dialogContentElement'].classList.add('prepare-print-dialog-content');

    this.elementHash['overlayContainerElement'] = document.querySelector('.cdk-overlay-container');
    this.elementHash['overlayContainerElement'].classList.add('prepare-print-overlay-container');
    this.elementHash['dialogContentElement'] = document.querySelector('app-parts-and-wastes-list-dialog .mat-dialog-content');
    this.elementHash['dialogContentElement'].classList.add('prepare-print-dialog-content');
    this.isInPrintMode = true;
  }

  rollbackPreparePrint() {
    if (this.isInPrintMode) {
      this.elementHash['htmlElement'].classList.remove('prepare-print-html');
      this.elementHash['bodyElement'].classList.remove('prepare-print-body');
      this.elementHash['dialogContainerElement'].classList.remove('prepare-print-dialog-container');
      this.elementHash['overlayContainerElement'].classList.remove('prepare-print-overlay-container');
      this.elementHash['dialogContentElement'].classList.remove('prepare-print-dialog-content');
      this.isInPrintMode = false;
    }
  }


}


  // /**
  //  * 1) set <dialog-container>'s overflow to visible, visibility to visible
  //  * 2) set <html>'s position to initial, visibility to hidden
  //  * 3) set <overlay-container>'s position to initial
  //  */


  // rollbackPreparePrint() {
  //   if (this.isInPrintMode) {
  //     this.elementHash['htmlElement'].classList.remove('prepare-print-html');
  //     this.elementHash['bodyElement'].classList.remove('prepare-print-body');
  //     this.elementHash['dialogContainerElement'].classList.remove('prepare-print-dialog-container');
  //     this.elementHash['overlayContainerElement'].classList.remove('prepare-print-overlay-container');
  //     this.elementHash['dialogContentElement'].classList.remove('prepare-print-dialog-content');
  //     this.isInPrintMode = false;
  //   }
  // }

  // ngOnDestroy() {
  //   this.rollbackPreparePrint();
  //   this.asyncDataLoader.destroy(this.asyncDataId);
  //   this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  //   this.listenerRxx.remove();
  // }
