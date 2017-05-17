import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data/data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/zip';


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
  dismantlingOrdersRx: Observable<any>;
  resolvedData: any;
  // resolvedDataP: any;
  typesRx: Observable<any>;
  titlesRx: Observable<any>;
  zipRx: Observable<any>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private data: DataService) { }

  ngOnInit() {
    this.vehicleRx = this.route.params.switchMap(params => {
      return this.data.getVehicleById(params['id']);
    });
    this.dismantlingOrdersRx = this.route.params.switchMap(params => {
      return this.data.getDismantlingOrdersByVIN(params['id]']);
    });
    this.isFromListRx = this.route.params.map(params => params['isFromList']);
    this.route.data.subscribe(data => this.resolvedData = data); // shall we use immutable?
    // this.route.parent.data.subscribe(data => this.resolvedDataP = data); // shall we use immutable?
    this.typesRx = this.data.typesRx;
    this.titlesRx = this.data.titlesRx;

    this.zipRx = this.route.params.switchMap(params => {
      return Observable.zip(
        this.data.getVehicleById(params['id']),
        this.data.getDismantlingOrdersByVIN(params['id']),
        this.data.typesRx,
        this.data.titlesRx,
        Observable.of(params['isFromList']),
        (vehicle, dismantlingOrders, types, titles, isFromList) => ({
          vehicle, dismantlingOrders, types, titles, isFromList
        }));
    });

  }

  goBack() {
    this.location.back();
  }

}
