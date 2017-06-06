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
  pTypes: any[];
  oTypes: any[];
  constructor() { }

  ngOnInit() {
    this.pTypes = this.types.idTypes.filter(t => t.id.indexOf('o') === -1);
    this.oTypes = this.types.idTypes.filter(t => t.id.indexOf('p') === -1);
    console.log(this.pTypes);
  }

}
