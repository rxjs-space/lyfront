import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class DataService {
  host = 'https://lymock.herokuapp.com';
  // host = 'http://localhost:3000';
  host1 = 'http://localhost:3001';

  vehiclesApiUrl = this.host + '/vehicles';
  dismantlingOrdersApiUrl = this.host + '/dismantlingOrders';
  typesApiUrl = this.host + '/types';
  titlesApiUrl = this.host + '/titles';
  private cache: {[key: string]: any} = {};
  constructor(private http: Http) { }

  authenticate(user: {username: string, password: string}) {
    const authenticateUrl = `${this.host1}/authenticate`;
    return this.http.post(authenticateUrl, {
      username: user.username,
      password: user.password
    })
      .map(res => {
        if (res.json() && res.json()['token']) {
          const token = res.json()['token'];
          localStorage.setItem('currentUser', JSON.stringify({ username: user.username, token }));
          return true;
        }
        return false;
      })
      .catch(err => {
        if (err.status === 401) {
          return Observable.of(401);
        }
        return this.handleError(err);
      });
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
    return Observable.of(error.message || error);
  }
}
