import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-vehicle-details-vehicle',
  templateUrl: './show-vehicle-details-vehicle.component.html',
  styleUrls: ['./show-vehicle-details-vehicle.component.scss']
})
export class ShowVehicleDetailsVehicleComponent implements OnInit {
  @Input() titles;
  @Input() formGroupInput: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}

