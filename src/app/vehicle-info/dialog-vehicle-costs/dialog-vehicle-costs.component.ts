import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';

@Component({
  selector: 'app-dialog-vehicle-costs',
  templateUrl: './dialog-vehicle-costs.component.html',
  styleUrls: ['./dialog-vehicle-costs.component.scss']
})
export class DialogVehicleCostsComponent implements OnInit {
  vCostForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<DialogVehicleCostsComponent>,
    public fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any,
    private sv: SharedValidatorsService
    ) { }

  ngOnInit() {
    this.vCostForm = this.fb.group({
      type: ['', [
        Validators.required,
        this.sv.notListed(this.data.types.vehicleCostTypes.map(type => type.name))
      ]],
      details: [''],
      amount: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }

  add() {
    this.vCostForm.get('type').disable();
    this.dialogRef.close(this.vCostForm);
  }

}



