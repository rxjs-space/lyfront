import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class DataService {
  vehiclesApiUrl = 'http://localhost:3000/vehicles';
  typesApiUrl = 'http://localhost:3000/types';
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


  get types() {
    return this.http.get(this.typesApiUrl)
      .map(res => res.json())
      .catch(err => this.handleError(err));
  }



  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.of(error.message || error);
  }
}
