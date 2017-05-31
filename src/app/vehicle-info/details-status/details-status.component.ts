import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details-status',
  templateUrl: './details-status.component.html',
  styleUrls: ['./details-status.component.scss']
})
export class DetailsStatusComponent implements OnInit {
  @Input() titles;
  @Input() types;
  @Input() formGroupInput: FormGroup;
  toShowDetails = true;
  constructor() { }

  ngOnInit() {
  }

}
