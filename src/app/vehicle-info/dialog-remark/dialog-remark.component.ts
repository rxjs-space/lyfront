import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-remark',
  templateUrl: './dialog-remark.component.html',
  styleUrls: ['./dialog-remark.component.scss']
})
export class DialogRemarkComponent implements OnInit {
  remarkForm: FormGroup;
  constructor(
    public dialogRef: MdDialogRef<DialogRemarkComponent>,
    public fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.remarkForm = this.fb.group({
      date: [(new Date()).toISOString().slice(0, 10)],
      by: [localStorage.getItem('currentUser')['username']],
      content: ['', [Validators.required]],
    })
  }

}
