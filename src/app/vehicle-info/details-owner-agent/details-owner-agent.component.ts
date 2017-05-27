import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details-owner-agent',
  templateUrl: './details-owner-agent.component.html',
  styleUrls: ['./details-owner-agent.component.scss']
})
export class DetailsOwnerAgentComponent implements OnInit {
  @Input() titles;
  @Input() types;
  @Input() formGroupInput: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
