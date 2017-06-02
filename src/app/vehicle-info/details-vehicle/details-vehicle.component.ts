import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-details-vehicle',
  templateUrl: './details-vehicle.component.html',
  styleUrls: ['./details-vehicle.component.scss']
})
export class DetailsVehicleComponent implements OnInit {
  @Input() titles;
  @Input() types;
  @Input() formGroupInput: FormGroup;
  @Output() onBrandBlur = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
