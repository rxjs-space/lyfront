import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data/data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-vehicle-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  /*
    if isFromList (meaning the showPage is triggered from the listPage), show 'goBack' button
  */
  isFromListRx: Observable<Boolean>;
  vehicleRx: Observable<any>;
  resolvedData: any;
  resolvedDataP: any;
  typesRx: Observable<any>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private data: DataService) { }

  ngOnInit() {
    this.vehicleRx = this.route.params.switchMap(params => {
      return this.data.getVehicleById(params['id']);
    });
    this.isFromListRx = this.route.params.map(params => params['isFromList']);
    this.route.data.subscribe(data => this.resolvedData = data); // shall we use immutable?
    this.route.parent.data.subscribe(data => this.resolvedDataP = data); // shall we use immutable?
    // this.typesRx = this.route.data.map(data => data['types']);
  }

  goBack() {
    this.location.back();
  }

}
