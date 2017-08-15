import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { PartsAndWastesListDialogComponent } from './parts-and-wastes-list-dialog.component';
@Component({
  selector: 'app-parts-and-wastes-list-dialog-trigger',
  templateUrl: './parts-and-wastes-list-dialog-trigger.component.html',
  styleUrls: ['./parts-and-wastes-list-dialog-trigger.component.scss']
})
export class PartsAndWastesListDialogTriggerComponent implements OnInit {

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(PartsAndWastesListDialogComponent, {
      width: '100%',
      height: '100%',
      disableClose: true
    });
  }

}
