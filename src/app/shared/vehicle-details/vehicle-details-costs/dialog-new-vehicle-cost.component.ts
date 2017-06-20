import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';

@Component({
  selector: 'app-dialog-new-vehicle-cost',
  templateUrl: './dialog-new-vehicle-cost.component.html',
  styleUrls: ['./dialog-new-vehicle-cost.component.scss']
})
export class DialogNewVehicleCostComponent implements OnInit {

  vcForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<DialogNewVehicleCostComponent>,
    public fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any,
    private sv: SharedValidatorsService
    ) { }

  ngOnInit() {
    this.vcForm = this.fb.group({
      type: ['', [
        Validators.required,
        this.sv.notListedButCanBeEmpty(this.data.btity.types['vehicleCostTypes'].map(type => type.name))
      ]],
      details: [''],
      amount: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.vcForm.disable(); // disable the form before adding it into the parent form
    this.dialogRef.close(this.vcForm);
  }

}
