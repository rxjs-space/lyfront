import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';


@Injectable()
export class DataService {
  // host = 'https://lymock.herokuapp.com';
  host = 'http://localhost:3000';


  vehiclesApiUrl = this.host + '/vehicles';
  dismantlingOrdersApiUrl = this.host + '/dismantlingOrders';
  typesApiUrl = this.host + '/types';
  titlesApiUrl = this.host + '/titles';
  private cache: {[key: string]: any} = {};
  constructor(private http: Http) { }


  getVehicles() {
    return this.http.get(this.vehiclesApiUrl)
      .map(res => res.json())
      .catch(err => this.handleError(err));
  }

  getVehicleById(id) {
    return this.http.get(this.vehiclesApiUrl + '/' + id)
      .map(res => res.json())
      .catch(err => this.handleError(err));
  }

  saveVehicleById(id, body) {
    return this.http.put(this.vehiclesApiUrl + '/' + id, body)
      .map(res => res.json())
      // .do(console.log)
      .catch(err => this.handleError(err));
  }

  updateBrands(brands) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.patch(this.host + '/types', {brands}, options)
      .map(res => res.json())
      // .do(console.log)
      .catch(err => this.handleError(err));
  }


  getDismantlingOrders() {
    return this.http.get(this.dismantlingOrdersApiUrl)
      .map(res => res.json())
      .catch(err => this.handleError(err));
  }

  getDismantlingOrdersByVIN(vin: string) {
    return this.http.get(this.dismantlingOrdersApiUrl + '?vin=' + vin)
      .map(res => res.json())
      .catch(err => this.handleError(err));
  }


  get typesRx() {
    if (this.cache && this.cache.types) {
      return Observable.of(this.cache.types);
    } else {
      return this.http.get(this.typesApiUrl)
        .map(res => {
          const data = res.json();
          this.cache.types = data;
          return data;
        })
        .catch(err => this.handleError(err));
    }
  }

  get titlesRx() {
    if (this.cache && this.cache.titles) {
      return Observable.of(this.cache.titles);
    } else {
      return this.http.get(this.titlesApiUrl)
        .map(res => {
          const data = res.json();
          this.cache.titles = res.json();
          return res.json();
        })
        .catch(err => this.handleError(err));
    }

  }


  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error);
  }
}
