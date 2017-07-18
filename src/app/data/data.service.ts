import { Injectable, Inject } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Vehicle } from './vehicle';
import { User } from './user';
import { BACK_END_URL, BOT_URL } from '../app-config';



@Injectable()
export class DataService {

  // host = 'http://localhost:3000'; // useless
  typesApiUrl1 = this.host1 + '/api/tt/one?name=types';
  titlesApiUrl1 = this.host1 + '/api/tt/one?name=titles';
  brandsApiUrl1 = this.host1 + '/api/brands';
  usersApiUrl = this.host1 + '/api/users';
  rolesApiUrl = this.host1 + '/api/roles';
  dismantlingOrderApiUrl1 = this.host1 + '/api/dismantling-orders';
  vehiclesApiUrl1 = this.host1 + '/api/vehicles';

  // vehiclesApiUrl = this.host + '/vehicles';
  // dismantlingOrdersApiUrl = this.host + '/dismantlingOrders';
  // typesApiUrl = this.host + '/types';
  // titlesApiUrl = this.host + '/titles';
  // private cache: {[key: string]: any} = {};
  btityRxx = new BehaviorSubject(null);
  mofcomLoggedInRxx = new BehaviorSubject(false);

  socketCaptcha: any;

  constructor(
    @Inject(BACK_END_URL) private host1,
    @Inject(BOT_URL) private botUrl,
    private http: Http
    ) {
      // for debugging socket.io, set localStorage.debug
      if (!environment.production) {
        console.log('setting');
        localStorage.debug = 'socket.io-client:socket';
      }
    }

  mofcomInit() {
    return this.http.post(this.botUrl + '/mofcom/init', {}, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
  }

  mofcomLogin(captcha) {
    // return this.http.post(this.botUrl + '/mofcom/login', {captcha}, this.setupOptions(true))
    //   .map(res => {
    //     this.mofcomLoggedInRxx.next(true);
    //     return res;
    //   })
    //   .catch(this.handleError);
    const jwt = JSON.parse(localStorage.getItem('currentUser'))['token'];
    return new Observable(observer => {
        this.socketCaptcha = io(this.botUrl);
        this.socketCaptcha.emit('captcha', {captcha, jwt});
        this.socketCaptcha.on('message', (data) => {
          observer.next(data);
          console.log(data.message);
          if (data.message.indexOf('logged in') > -1) {
            this.mofcomLoggedInRxx.next(true);
          }
        });
        this.socketCaptcha.on('connect_failed', (error) => observer.error(error));
        return () => {
          this.socketCaptcha.disconnect();
        };
      });

  }

  mofcomNewVehicle(vehicle) {
    return this.http.post(this.botUrl + '/mofcom/new-vehicle', {vehicle}, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
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

  refreshBtityRx(): Observable<any> {
    return Observable.zip(
      this.brandsOnceRx,
      this.titlesOnceRx,
      this.typesOnceRx,
      (brands, titles, types) => ({brands, titles, types})
    ).first()
      .do(this.btityRxx)
      .catch(this.handleError);
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

  getRoles() {
    return this.http.get(this.rolesApiUrl, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
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

  insertBrands(brands) {
    // brands can be either an array of brands or an object of a brand, backend will handle
    return this.http.post(this.brandsApiUrl1, brands, this.setupOptions(true))
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }


  updateTypes(patches) {
    console.log('updating types...')
    return this.http.patch(this.typesApiUrl1, {patches}, this.setupOptions(true))
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  // get typesRx() {
  //   if (this.cache && this.cache.types) {
  //     return Observable.of(this.cache.types);
  //   } else {
  //     const options = this.setupOptions(true);
  //     // return this.http.get(this.typesApiUrl)
  //     return this.http.get(this.typesApiUrl1, options)
  //       .map(res => {
  //         const data = res.json();
  //         this.cache.types = data;
  //         return data;
  //       })
  //       .catch(error => this.handleError(error));
  //   }
  // }

  /* work with typesRxx */
  get typesOnceRx() {
    return this.http.get(this.typesApiUrl1, this.setupOptions(true))
      .first()
      .map(res => res.json())
      .catch(error => this.handleError(error))
  }

  // get brandsRx() {
  //   if (this.cache && this.cache.brands) {
  //     return Observable.of(this.cache.brands);
  //   } else {
  //     const options = this.setupOptions(true);
  //     return this.http.get(this.brandsApiUrl1, options)
  //       .map(res => {
  //         const data = res.json();
  //         this.cache.brands = data;
  //         return data;
  //       })
  //       .catch(error => this.handleError(error));
  //   }
  // }

  get brandsOnceRx() {
    return this.http.get(this.brandsApiUrl1, this.setupOptions(true))
      .first()
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  // get titlesRx() {
  //   if (this.cache && this.cache.titles) {
  //     return Observable.of(this.cache.titles);
  //   } else {
  //     const options = this.setupOptions(true);
  //     // return this.http.get(this.titlesApiUrl)
  //     return this.http.get(this.titlesApiUrl1, options)
  //       .map(res => {
  //         const data = res.json();
  //         this.cache.titles = res.json();
  //         return res.json();
  //       })
  //       .catch(error => this.handleError(error));
  //   }

  // }

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

  getDismantlingOrderById(id) {
    return this.http.get(this.dismantlingOrderApiUrl1 + `/one?dismantlingOrderId=${id}`, this.setupOptions(true))
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

  updateDismantlingOrder(dismantlingOrderId, vin, patches) {
    return this.http.patch(this.dismantlingOrderApiUrl1 + '/one', {
      dismantlingOrderId, vin, patches
    }, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
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

  /**
   * if (!userId), return Observable.of(User class), ie, empty user
   */
  getUserById(userId) {
    if (userId) {
      return this.http.get(this.usersApiUrl + `/one?userId=${userId}`, this.setupOptions(true))
        .map(res => res.json())
        .catch(this.handleError)
    } else {
      return Observable.of(new User());
    }
  }

  getUserByUserName(username) {
    return this.http.get(this.usersApiUrl + `/one?username=${username}`, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
  }

  insertUser(user) {
    return this.http.post(this.usersApiUrl, user, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
  }


  vehiclesReports(title) {
    return this.http.get(this.vehiclesApiUrl1 + `/reports?title=${title}`, this.setupOptions(true))
      .map(res => {
        const resJSON = res.json();
        const hasMongoError = JSON.stringify(resJSON).indexOf('MongoError') > -1;
        if (hasMongoError) {throw resJSON; }
        return res.json();
      })
      .catch(error => this.handleError(error));

  }

  vehiclesSurveyStatus(surveyType: string, vehicleList: string[]) {
    return this.http.patch(this.vehiclesApiUrl1 + '/survey', {
      surveyType,
      vehicleList
    }, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
  }

  vehiclesSearch(key: string) {
    return this.http.get(this.vehiclesApiUrl1 + `/search?key=${key}`, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log('Lyfront caught an error', error); // for demo purposes only
    return Observable.throw(error.json());
  }
}
