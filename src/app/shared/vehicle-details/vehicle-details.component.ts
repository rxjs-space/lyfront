import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  @Input() vehicle: any;
  constructor() { }

  ngOnInit() {
    console.log(this.vehicle);
  }

}
