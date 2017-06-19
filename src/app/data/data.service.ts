import { Injectable, Inject } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';

import { Vehicle } from './vehicle';
import { BACK_END_URL } from '../app-config';



@Injectable()
export class DataService {

  host = 'http://localhost:3000'; // useless
  typesApiUrl1 = this.host1 + '/api/tt/one?name=types';
  titlesApiUrl1 = this.host1 + '/api/tt/one?name=titles';
  brandsApiUrl1 = this.host1 + '/api/brands';
  dismantlingOrderApiUrl1 = this.host1 + '/api/dismantling-orders';
  vehiclesApiUrl1 = this.host1 + '/api/vehicles';

  // vehiclesApiUrl = this.host + '/vehicles';
  // dismantlingOrdersApiUrl = this.host + '/dismantlingOrders';
  // typesApiUrl = this.host + '/types';
  // titlesApiUrl = this.host + '/titles';
  private cache: {[key: string]: any} = {};
  btityRxx = new BehaviorSubject(null);
  constructor(
    @Inject(BACK_END_URL) private host1,
    private http: Http
    ) {

      // this.getTypesOnceRx();
      // this.getTitlesOnce();
      // this.getBrandsOnce();
    }

  refreshBtity() {
    return Observable.zip(
      this.brandsOnceRx,
      this.titlesOnceRx,
      this.typesOnceRx,
      (brands, titles, types) => ({brands, titles, types})
    ).first()
      .subscribe(v => {
        console.log(v);
        this.btityRxx.next(v);
      });
  }

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

  searchParamsObjToSearchParams(searchParamsObj) {
    const urlSearchParams = new URLSearchParams();
    for (const k in searchParamsObj) {
      if (k) {
        urlSearchParams.set(k, searchParamsObj[k]);
      }
    }
    return urlSearchParams;
  }

  getVehicles(searchParmas = {}) {
    // const urlSearchParams = new URLSearchParams();
    // for (const k in searchParmas) {
    //   if (k) {
    //     urlSearchParams.set(k, searchParmas[k]);
    //   }
    // }
    return this.http.get(this.vehiclesApiUrl1, this.setupOptions(true).merge({
      search: this.searchParamsObjToSearchParams(searchParmas)
    }))
      .map(res => {
        const resJSON = res.json();
        const hasMongoError = JSON.stringify(resJSON).indexOf('MongoError') > -1;
        if (hasMongoError) {throw resJSON; }
        return res.json();
      })
      .catch(error => this.handleError(error));
  }
  // getVehicles() {
  //   return this.http.get(this.vehiclesApiUrl)
  //     .map(res => res.json())
  //     .catch(error => this.handleError(error));
  // }

  getVehicleByVIN(vin, returnIDOnly = false) {
    return this.http.get(
      `${this.vehiclesApiUrl1}/one?vin=${vin}&returnIDOnly=${returnIDOnly}`, this.setupOptions(true))
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }
  // getVehicleById(id) {
  //   return this.http.get(this.vehiclesApiUrl + '/' + id)
  //     .map(res => res.json())
  //     .catch(error => this.handleError(error));
  // }

  /**
   * param 'body' will have properties 'vehicle' and 'patches'
   */
  insertVehicle(body) {
    const options = this.setupOptions(true);
    return this.http.post(this.vehiclesApiUrl1, body, options)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  /**
   * param 'body' will have property 'patches'
   */
  updateVehicle(vin, body) {
    return this.http.patch(`${this.vehiclesApiUrl1}/one?vin=${vin}`, body, this.setupOptions(true))
      .map(res => res.json())
      .catch(error => this.handleError(error));
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
      .catch(error => this.handleError(error));
  }


  updateTypes(patches) {
    console.log('updating types...')
    return this.http.patch(this.typesApiUrl1, {patches}, this.setupOptions(true))
      .map(res => res.json())
      .catch(error => this.handleError(error));
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
        .catch(error => this.handleError(error));
    }
  }

  /* work with typesRxx */
  get typesOnceRx() {
    return this.http.get(this.typesApiUrl1, this.setupOptions(true))
      .first()
      .map(res => res.json())
      .catch(error => this.handleError(error))
  }

  get brandsRx() {
    if (this.cache && this.cache.brands) {
      return Observable.of(this.cache.brands);
    } else {
      const options = this.setupOptions(true);
      return this.http.get(this.brandsApiUrl1, options)
        .map(res => {
          const data = res.json();
          this.cache.brands = data;
          return data;
        })
        .catch(error => this.handleError(error));
    }
  }

  get brandsOnceRx() {
    return this.http.get(this.brandsApiUrl1, this.setupOptions(true))
      .first()
      .map(res => res.json())
      .catch(error => this.handleError(error))
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
        .catch(error => this.handleError(error));
    }

  }

  get titlesOnceRx() {
    return this.http.get(this.titlesApiUrl1, this.setupOptions(true))
      .first()
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  getDismantlingOrders(searchParams = {}) {
    return this.http.get(this.dismantlingOrderApiUrl1, this.setupOptions(true).merge({
      search: this.searchParamsObjToSearchParams(searchParams)
    }))
      .map(res => {
        const resJSON = res.json();
        const hasMongoError = JSON.stringify(resJSON).indexOf('MongoError') > -1;
        if (hasMongoError) {throw resJSON; }
        return res.json();
      })
      .catch(error => this.handleError(error));
  }


  insertDismantlingOrder(dismantlingOrderAndPatches: any) {
    return this.http.post(this.dismantlingOrderApiUrl1, dismantlingOrderAndPatches, this.setupOptions(true))
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  dismantlingOrderReports() {
    return this.http.get(this.dismantlingOrderApiUrl1 + '/reports', this.setupOptions(true))
      .map(res => {
        const resJSON = res.json();
        const hasMongoError = JSON.stringify(resJSON).indexOf('MongoError') > -1;
        if (hasMongoError) {throw resJSON; }
        return res.json();
      })
      .catch(error => this.handleError(error));
  }


  private handleError(error: any) {
    console.log('Lyfront caught an error', error); // for demo purposes only
    return Observable.throw(error);
  }
}
