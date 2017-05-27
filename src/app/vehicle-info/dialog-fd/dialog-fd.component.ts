import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-fd',
  templateUrl: './dialog-fd.component.html',
  styleUrls: ['./dialog-fd.component.scss']
})
export class DialogFdComponent implements OnInit {
  fdForm: FormGroup;
  constructor(
    public dialogRef: MdDialogRef<DialogFdComponent>,
    public fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.fdForm = this.fb.group({
      type: [''],
      part: [''],
      details: [''],
      amount: ['', Validators.pattern(/^[0-9]+$/)]
    })
  }

}
