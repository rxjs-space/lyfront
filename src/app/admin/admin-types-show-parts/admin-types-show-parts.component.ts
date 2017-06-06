import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-admin-types-show-parts',
  templateUrl: './admin-types-show-parts.component.html',
  styleUrls: ['./admin-types-show-parts.component.scss']
})
export class AdminTypesShowPartsComponent implements OnInit {
  @Input() formGroupInput: FormGroup | FormArray;
  constructor() { }

  ngOnInit() {
  }

}
