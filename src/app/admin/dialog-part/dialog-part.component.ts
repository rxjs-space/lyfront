import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';

@Component({
  selector: 'app-dialog-part',
  templateUrl: './dialog-part.component.html',
  styleUrls: ['./dialog-part.component.scss']
})
export class DialogPartComponent implements OnInit {
  partForm: FormGroup;
  constructor(
    private sv: SharedValidatorsService,
    public fb: FormBuilder,
    public dialogRef: MdDialogRef<DialogPartComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.partForm = this.fb.group({
      id: [{value: this.data.nextId, disabled: true}],
      name: ['', [Validators.required, this.sv.duplicateName(this.data.parts.map(p => p.name))]]
    });
    // this.partForm.valueChanges
    //   .subscribe(() => {
    //     console.log(this.partForm.get('name').errors);
    //   })
  }

  onSubmit() {
    this.dialogRef.close(this.partForm);
  }

}
