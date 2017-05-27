import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details-condition-rv-fd',
  templateUrl: './details-condition-rv-fd.component.html',
  styleUrls: ['./details-condition-rv-fd.component.scss']
})
export class DetailsConditionRvFdComponent implements OnInit {
  @Input() titles;
  @Input() types;
  @Input() formGroupInput: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
