import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data/data.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/zip';


@Component({
  selector: 'app-vehicle-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {
  /*
    if isFromList (meaning the showPage is triggered from the listPage), show 'goBack' button
  */
  typesRx: Observable<any>;
  titlesRx: Observable<any>;
  zip_: Subscription;
  zipData: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private data: DataService) { }

  ngOnInit() {
    this.zip_ = this.route.url.switchMap(url => {
      const isNew = url[0].path === 'new';
      return this.route.params.switchMap(params => {
        return Observable.zip(
          (isNew ? this.data.getVehicleById('ABCD12345678') : this.data.getVehicleById(params['id'])),
          this.data.typesRx,
          this.data.titlesRx,
          Observable.of(params['isFromList']),
          (vehicle, types, titles, isFromList) => ({
            vehicle, types, titles, isFromList
          }));
      });
    })
      .catch(error => Observable.of({ok: false, error}))
      .subscribe(zipData => this.zipData = zipData);

  }

  ngOnDestroy() {
    this.zip_.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  saveVehicle(id, body) {
    return this.data.saveVehicleById(id, body);
  }

}
