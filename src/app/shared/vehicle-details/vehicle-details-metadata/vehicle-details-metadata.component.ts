import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-details-metadata',
  templateUrl: './vehicle-details-metadata.component.html',
  styleUrls: ['./vehicle-details-metadata.component.scss']
})
export class VehicleDetailsMetadataComponent implements OnInit {
  @Input() vehicle: any;
  createdAt: any;
  createdBy: any;
  modifiedAt: any;
  modifiedBy: any;
  constructor() { }

  ngOnInit() {
    this.createdAt = new Date(this.vehicle.createdAt);
    this.modifiedAt = new Date(this.vehicle.modifiedAt);
    this.createdBy = this.vehicle.createdBy;
    this.modifiedBy = this.vehicle.modifiedBy;
  }

}
