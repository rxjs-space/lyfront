import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-photos',
  templateUrl: './details-photos.component.html',
  styleUrls: ['./details-photos.component.scss']
})
export class DetailsPhotosComponent implements OnInit {
  toDisplayVehicleImage = false;

  constructor() { }

  ngOnInit() {
  }

}
