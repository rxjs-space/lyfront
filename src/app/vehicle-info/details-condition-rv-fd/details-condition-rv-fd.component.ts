import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { DialogFdComponent } from '../dialog-fd/dialog-fd.component';
import { DialogYesOrNoComponent } from '../../shared/dialog-yes-or-no/dialog-yes-or-no.component';



@Component({
  selector: 'app-details-condition-rv-fd',
  templateUrl: './details-condition-rv-fd.component.html',
  styleUrls: ['./details-condition-rv-fd.component.scss']
})
export class DetailsConditionRvFdComponent implements OnInit {
  @Input() titles;
  @Input() types;
  @Input() formGroupInput: FormGroup;
  @Input() methods: any;
  constructor(public dialog: MdDialog) { }
  openDialogNewFD() {
    // this.dialog.open(DialogFdComponent);
    const dialogRef = this.dialog.open(DialogFdComponent, {
      data: {types: this.types, titles: this.titles},
    });
    dialogRef.afterClosed().subscribe((newFDForm: FormGroup) => {
      console.log(newFDForm);
      if (newFDForm) {
        this.methods.new(newFDForm);
      }
    });

  }
  ngOnInit() {
  }

  openDialogDeleteFD(index: number) {
    // this.dialog.open(DialogFdComponent);
    const dialogRef = this.dialog.open(DialogYesOrNoComponent, {
      data: {
        message: '删除此条记录？',
        index
      }
    });
    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.methods.delete(index);
      }
    });

  }

}

