import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import jsonpatch from 'fast-json-patch';


@Component({
  selector: 'app-admin-types-show',
  templateUrl: './admin-types-show.component.html',
  styleUrls: ['./admin-types-show.component.scss']
})
export class AdminTypesShowComponent implements OnInit {
  @Input() typesInput: any;
  types: any;
  typesForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.types = JSON.parse(JSON.stringify(this.typesInput));
    const parts = (this.types.parts as {id: string, name: string}[]).sort((a, b) => {
      return a.id.localeCompare(b.id);
    })
    const partsGroups = parts.map(p => {
      return this.fb.group({
        id: {value: p.id, disabled: true},
        name: p.name
      })
    });

    this.typesForm = this.fb.group({
      parts: this.fb.array(partsGroups)
    });


  }

  prepareSubmit() {
    console.log('prepare');
    console.log(jsonpatch.compare(this.types.parts, this.typesForm.getRawValue().parts));
    // console.log(this.typesForm.getRawValue().parts);
  }

}
