import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details-general',
  templateUrl: './details-general.component.html',
  styleUrls: ['./details-general.component.scss']
})
export class DetailsGeneralComponent implements OnInit {
  @Input() titles;
  @Input() types;
  @Input() formGroupInput: FormGroup;
  @Input() isNew: Boolean;
  constructor() { }

  ngOnInit() {
  }

}
