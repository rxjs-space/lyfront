import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-types-show',
  templateUrl: './admin-types-show.component.html',
  styleUrls: ['./admin-types-show.component.scss']
})
export class AdminTypesShowComponent implements OnInit {
  @Input() types: any;
  typesForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const partsGroups = this.types.parts.map(p => {
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
  }

}
