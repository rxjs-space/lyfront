import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class DataService {
  host = 'https://lymock.herokuapp.com';
  // host = 'http://localhost:3000';
  vehiclesApiUrl = this.host + '/vehicles';
  dismantlingOrdersApiUrl = this.host + '/dismantlingOrders';
  typesApiUrl = this.host + '/types';
  titlesApiUrl = this.host + '/titles';
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


  get types() {
    return this.http.get(this.typesApiUrl)
      .map(res => res.json())
      .catch(err => this.handleError(err));
  }

  get titles() {
    return this.http.get(this.titlesApiUrl)
      .map(res => res.json())
      .catch(err => this.handleError(err));

  }


  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.of(error.message || error);
  }
}
