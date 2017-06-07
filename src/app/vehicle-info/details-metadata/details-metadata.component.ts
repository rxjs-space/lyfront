import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-metadata',
  templateUrl: './details-metadata.component.html',
  styleUrls: ['./details-metadata.component.scss']
})
export class DetailsMetadataComponent implements OnInit {
  createdAt;
  modifiedAt;
  @Input() vehicle: any;
  constructor() { }

  ngOnInit() {
    this.createdAt = new Date(this.vehicle.createdAt);
    this.modifiedAt = new Date(this.vehicle.modifiedAt);
  }

}
