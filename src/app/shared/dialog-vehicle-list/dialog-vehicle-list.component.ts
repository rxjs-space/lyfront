import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-vehicle-list',
  templateUrl: './dialog-vehicle-list.component.html',
  styleUrls: ['./dialog-vehicle-list.component.scss']
})
export class DialogVehicleListComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<DialogVehicleListComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
  ) { }

  ngOnInit() {
    // console.log(this.dataFromTrigger);
  }

}
