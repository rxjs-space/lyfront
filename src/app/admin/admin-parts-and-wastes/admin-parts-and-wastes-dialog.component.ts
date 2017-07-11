import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';

@Component({
  selector: 'app-admin-parts-and-wastes-dialog',
  templateUrl: './admin-parts-and-wastes-dialog.component.html',
  styleUrls: ['./admin-parts-and-wastes-dialog.component.scss']
})
export class AdminPartsAndWastesDialogComponent implements OnInit {

  fform: FormGroup;
  title: string;
  constructor(
    private sv: SharedValidatorsService,
    public fb: FormBuilder,
    public dialogRef: MdDialogRef<AdminPartsAndWastesDialogComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
  ) { }

  ngOnInit() {
    const cat = this.dataFromTrigger.nextId.slice(0, 1);
    this.title = `添加${this.dataFromTrigger.categoryTitle}类别`;
    // switch (cat) {
    //   case 'p': this.title = '添加零件类别'; break;
    //   case 'w': this.title = '添加危废品类别'; break;
    // }
    this.fform = this.fb.group({
      id: [{value: this.dataFromTrigger.nextId, disabled: true}],
      name: ['', [Validators.required, this.sv.duplicateNameInObjArray(this.dataFromTrigger.POWs)]]
    });

  }

  onSubmit() {
    this.dialogRef.close(this.fform);
  }

}
