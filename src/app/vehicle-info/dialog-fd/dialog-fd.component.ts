import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';

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
    @Inject(MD_DIALOG_DATA) public data: any,
    private sv: SharedValidatorsService
    ) { }
    

  ngOnInit() {
    this.fdForm = this.fb.group({
      type: ['', [
        Validators.required,
        this.sv.notListed(this.data.types.feesAndDeductionsTypes.map(type => type.name))
      ]],
      part: [''],
      details: [''],
      amount: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });

    this.fdForm.get('type').valueChanges.startWith(null).subscribe(v => {
      // if the type is '零件遗失' and the 'part' field is empty, ...
      if (v === this.data.types.feesAndDeductionsTypes.find(t => t.id = '1').name && !this.fdForm.get('part').value) {
        setTimeout(() => {
          this.fdForm.get('part').setErrors({"required when type is 零件遗失": true});
        });
      } else {
        setTimeout(() => {
          this.fdForm.get('part').setErrors(null);
        })
      }
    })
  }

}
