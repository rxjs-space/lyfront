import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details-docs',
  templateUrl: './details-docs.component.html',
  styleUrls: ['./details-docs.component.scss']
})
export class DetailsDocsComponent implements OnInit {
  @Input() titles;
  @Input() types;
  @Input() formGroupInput: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
