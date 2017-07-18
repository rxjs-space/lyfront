import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';

@Component({
  selector: 'app-dialog-new-fd',
  templateUrl: './dialog-new-fd.component.html',
  styleUrls: ['./dialog-new-fd.component.scss']
})
export class DialogNewFdComponent implements OnInit {
  fdForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<DialogNewFdComponent>,
    public fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any,
    private sv: SharedValidatorsService
    ) { }

  ngOnInit() {
    this.fdForm = this.fb.group({
      type: ['', [
        Validators.required,
        this.sv.notListedButCanBeEmpty(this.data.btity.types['feesAndDeductionsTypes'].map(type => type.name))
      ]],
      part: ['', [
        this.sv.notListedButCanBeEmpty(this.data.btity.types['parts'].map(p => p.name)),
        this.sv.requiredBasedOnAnotherControlAndItsValue('type', '零件遗失')
      ]],
      details: ['', this.sv.startedWithSpace()],
      amount: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.fdForm.disable(); // disable the form before adding it into the parent form
    this.dialogRef.close(this.fdForm);
  }

}
