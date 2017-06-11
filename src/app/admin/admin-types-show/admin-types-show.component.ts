import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import jsonpatch from 'fast-json-patch';

import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';
@Component({
  selector: 'app-admin-types-show',
  templateUrl: './admin-types-show.component.html',
  styleUrls: ['./admin-types-show.component.scss']
})
export class AdminTypesShowComponent implements OnInit {
  @Input() typesInput: any;
  @Output() save = new EventEmitter();
  types: any;
  typesForm: FormGroup;
  constructor(
    private sv: SharedValidatorsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.types = JSON.parse(JSON.stringify(this.typesInput));
    const parts = (this.types.parts as {id: string, name: string}[]).sort((a, b) => {
      return a.id.localeCompare(b.id);
    });

    this.typesForm = this.fb.group({
      parts: this.fb.array(parts.map(p => {
        return this.fb.group({
          id: {value: p.id, disabled: true},
          name: [p.name, [this.sv.duplicateNameInObjArray(parts)]]
        });
      }))
    });

    // console.log(this.typesForm.get('parts'));


  }

  prepareSubmit() {
    console.log('prepare');
    // console.log('input', this.typesInput.parts);
    // console.log('updated', this.typesForm.getRawValue().parts);
    // console.log(this.typesInput);
    const types0 = this.typesInput;
    const types1 = Object.assign(JSON.parse(JSON.stringify(this.typesInput)), {parts: this.typesForm.getRawValue().parts});
    const patches = jsonpatch.compare(types0, types1);
    // console.log(patches);
    // // console.log(this.typesForm.getRawValue().parts);
    this.typesForm.markAsPristine();
    this.typesForm.markAsUntouched();
    this.save.emit(patches);
  }

}
