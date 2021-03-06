import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { DialogRemarkComponent } from '../dialog-remark/dialog-remark.component';


@Component({
  selector: 'app-details-remarks',
  templateUrl: './details-remarks.component.html',
  styleUrls: ['./details-remarks.component.scss']
})
export class DetailsRemarksComponent implements OnInit {
  @Input() titles;
  @Input() types;
  @Input() formGroupInput: FormArray;
  remarkCtrls: AbstractControl[];
  constructor(public dialog: MdDialog) { }

  openDialogNewRemark() {
    // this.dialog.open(DialogFdComponent);
    const dialogRef = this.dialog.open(DialogRemarkComponent, {
      data: {titles: this.titles},
    });
    dialogRef.afterClosed().subscribe((newRemarkForm: FormGroup) => {
      if (newRemarkForm) {
        newRemarkForm.get('date').disable();
        newRemarkForm.get('content').disable();
        this.formGroupInput.markAsTouched(); // order 1.a
        this.formGroupInput.markAsDirty(); // order 1.b
        this.formGroupInput.push(newRemarkForm); // order 2
      }
    });

  }

  ngOnInit() {
    this.remarkCtrls = this.formGroupInput.controls;
  }

}
