import { Component, Input, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit() {
  }


}
