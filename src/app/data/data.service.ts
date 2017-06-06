import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { Vehicle } from './vehicle';



@Injectable()
export class DataService {
  // host = 'https://lymock.herokuapp.com';
  host = 'http://localhost:3000';
  host1 = 'http://localhost:3001';
  typesApiUrl1 = this.host1 + '/api/tt/one?name=types';
  titlesApiUrl1 = this.host1 + '/api/tt/one?name=titles';
  brandsApiUrl1 = this.host1 + '/api/brands';

  vehiclesApiUrl = this.host + '/vehicles';
  dismantlingOrdersApiUrl = this.host + '/dismantlingOrders';
  typesApiUrl = this.host + '/types';
  titlesApiUrl = this.host + '/titles';
  private cache: {[key: string]: any} = {};
  constructor(private http: Http) { }

  setupOptions(withJWT: Boolean = false): RequestOptions {
    let headers;
    if (withJWT) {
      const jwt = JSON.parse(localStorage.getItem('currentUser'))['token'];
      headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      });
    } else {
      headers = new Headers({ 'Content-Type': 'application/json' });
    }
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  test() {
    console.log(this.setupOptions(true));
  }

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
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.patch(this.vehiclesApiUrl + '/' + id, body, options)
      .map(res => res.json())
      .catch(err => this.handleError(err));
  }

  createNewVehicle() {
    return Observable.of(new Vehicle());
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
      const options = this.setupOptions(true);
      // return this.http.get(this.typesApiUrl)
      return this.http.get(this.typesApiUrl1, options)
        .map(res => {
          const data = res.json();
          this.cache.types = data;
          return data;
        })
        .catch(err => this.handleError(err));

    }
  }

  get brandsRx() {
    if (this.cache && this.cache.brands) {
      return Observable.of(this.cache.brands);
    } else {
      const options = this.setupOptions(true);
      // return this.http.get(this.typesApiUrl)
      return this.http.get(this.brandsApiUrl1, options)
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
      const options = this.setupOptions(true);
      // return this.http.get(this.titlesApiUrl)
      return this.http.get(this.titlesApiUrl1, options)
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
