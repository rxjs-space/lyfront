import { Injectable, Inject } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Vehicle } from './vehicle';
import { User } from './user';
import { DismantlingOrder } from './dismantling-order';
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
  inventoryApiUrl = this.host1 + '/api/inventory';

  // vehiclesApiUrl = this.host + '/vehicles';
  // dismantlingOrdersApiUrl = this.host + '/dismantlingOrders';
  // typesApiUrl = this.host + '/types';
  // titlesApiUrl = this.host + '/titles';
  // private cache: {[key: string]: any} = {};
  btityRxx = new BehaviorSubject(null);
  mofcomLoggedInRxx = new BehaviorSubject(false);
  mofcomBotGetMessageRxx: Subject<any> = new Subject();
  socketBotMofcom: any;
  socketAPI: any;

  socketBotRtc: any;
  rtcSocketIncomingMessageRxx: Subject<any> = new Subject();
  // rtcSocketConnectedRxx = new BehaviorSubject(null);
  inventoryInputDoneRxx = new BehaviorSubject(null);
  vehiclesReportsRxx = new BehaviorSubject({});

  constructor(
    @Inject(BACK_END_URL) private host1,
    @Inject(BOT_URL) private botUrl,
    private http: Http
    ) {
      // for debugging socket.io, set localStorage.debug
      if (!environment.production) {
        // console.log('setting');
        localStorage.debug = 'socket.io-client:socket';
      }
      this.mofcomBotInit();
      // this.socketBotMofcom = io(`${this.botUrl}/mofcom`);
      // this.socketBotMofcom.on('message', (message) => {
      //   this.mofcomBotGetMessageRxx.next(message);
      // });
    }


  // get mofcomBotGetMessageRx(): Observable<any> {
  //   if (!this.socketBot) {
  //     this.socketBot = io(this.botUrl);
  //   }
  //   return new Observable(observer => {
  //     this.socketBot.on('message', (message) => {
  //       observer.next(message);
  //       this.mofcomBotGetMessageRxx.next(message);
  //     });
  //     return () => {
  //       this.socketBot.disconnect();
  //     };
  //   })
  // }

  rtcSocketInit() {
    // if (!this.rtcSocketConnectedRxx.getValue()) {
      this.socketBotRtc = io(`${this.host1}/rtc`);
      this.socketBotRtc.on('message', (message) => {
        console.log('rtc message:', message);
        this.rtcSocketIncomingMessageRxx.next(message);
      });
    // }

  }

  mofcomBotInit() {
    this.socketBotMofcom = io(`${this.botUrl}/mofcom`);
    this.socketBotMofcom.on('message', (message) => {
      console.log(message);
      this.mofcomBotGetMessageRxx.next(message);
    });
  }

  mofcomBotSendMessage(message) {
    /* sample message
    {
      bot: 'mofcom',
      action: 'newEntry',
      data: {vehicle}
    }
    */
    const jwt = JSON.parse(localStorage.getItem('currentUser'))['token'];
    if (!this.socketBotMofcom) {
      // this.socketBotMofcom = io(this.botUrl);
      this.mofcomBotInit();
    }
    message.jwt = jwt;
    this.socketBotMofcom.send(message);
  }

  mofcomOps(vehicle): Observable<{done: boolean, message: string}> {
    const jwt = JSON.parse(localStorage.getItem('currentUser'))['token'];
    return new Observable(observer => {
        this.socketBotMofcom = io(this.botUrl);
        this.socketBotMofcom.emit('mofcomEntry', {jwt, vehicle});
        this.socketBotMofcom.on('notLoggedIn', () => {
          observer.next({
            done: false,
            message: 'notLoggedIn'
          });
        });
        // this.socketBot.emit('captcha', {captcha, jwt});
        // this.socketBot.on('message', (data) => {
        //   observer.next(data);
        //   // console.log(data.message);
        //   if (data.message.indexOf('logged in') > -1) {
        //     console.log('received log in message');
        //     this.mofcomLoggedInRxx.next(true);
        //   }
        // });
        // this.socketBot.on('error', (error) => observer.error(error));
        // this.socketBot.on('connect_failed', (error) => observer.error(error));
        return () => {
          this.socketBotMofcom.disconnect();
        };
      });
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
        this.socketBotMofcom = io(this.botUrl);
        this.socketBotMofcom.emit('captcha', {captcha, jwt});
        this.socketBotMofcom.on('message', (data) => {
          observer.next(data);
          // console.log(data.message);
          if (data.message.indexOf('logged in') > -1) {
            console.log('received log in message');
            this.mofcomLoggedInRxx.next(true);
          }
        });
        this.socketBotMofcom.on('error', (error) => observer.error(error));
        this.socketBotMofcom.on('connect_failed', (error) => observer.error(error));
        return () => {
          this.socketBotMofcom.disconnect();
        };
      });

  }

  mofcomNewVehicle(vehicle) {
    // return Observable.of('ok');
    return this.http.post(this.botUrl + '/mofcom/new-vehicle', {vehicle}, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
  }

  refreshBtity() {
    return Observable.zip(
      this.brandsOnceRx,
      this.titlesOnceRx,
      this.typesOnceRx,
      this.staffsRx,
      (brands, titles, types, staffs) => ({brands, titles, types, staffs})
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
      this.staffsRx,
      (brands, titles, types, staffs) => ({brands, titles, types, staffs})
    ).first()
      .do(this.btityRxx)
      .catch(this.handleError);
  }

  get staffsRx() {
    return this.http.get(this.usersApiUrl + '/staffs', this.setupOptions(true))
      .map(res => res.json())
      .map(staffs => staffs.sort((a, b) => {
        return a['displayName'].localeCompare(b['displayName'], 'zh-CN');
      }))
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

  getStaffs() {
    return this.http.get(this.usersApiUrl + '/staffs', this.setupOptions(true))
      .map(res => res.json())
      .map(staffs => staffs.sort((a, b) => {
        return a['displayName'].localeCompare(b['displayName'], 'zh-CN');
      }))
      .catch(this.handleError);
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
      // .do(console.log)
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

  getDismantlingOrderById(id?) {
    if (id) {
      return this.http.get(this.dismantlingOrderApiUrl1 + `/one?dismantlingOrderId=${id}`, this.setupOptions(true))
        .map(res => {
          const resJSON = res.json();
          const hasMongoError = JSON.stringify(resJSON).indexOf('MongoError') > -1;
          if (hasMongoError) {throw resJSON; }
          return res.json();
        })
        .catch(error => this.handleError(error));
    } else {
      return Observable.of(new DismantlingOrder());
    }

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

  dismantlingOrdersReports(title) {
    return this.http.get(this.dismantlingOrderApiUrl1 + `/reports?title=${title}`, this.setupOptions(true))
      .map(res => {
        const resJSON = res.json();
        const hasMongoError = JSON.stringify(resJSON).indexOf('MongoError') > -1;
        if (hasMongoError) {throw resJSON; }
        return res.json();
      })
      .catch(error => this.handleError(error));
  }


  getUsers() {
    return this.http.get(this.usersApiUrl, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
  }
  /**
   * if (!userId), return Observable.of(User class), ie, empty user
   */
  getUserById(userId) {
    if (userId) {
      return this.http.get(this.usersApiUrl + `/one?userId=${userId}`, this.setupOptions(true))
        .map(res => res.json())
        .catch(this.handleError);
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
        const newVehicleReports = Object.assign({}, this.vehiclesReportsRxx.getValue(), {
          title: resJSON
        })
        this.vehiclesReportsRxx.next(newVehicleReports);
        return resJSON;
      })
      .catch(error => this.handleError(error));

  }

  vehiclesUpdateSurveyStatus(surveyType: string, vehicleList: string[]) {
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


  /**
   * imventory part start
   */

  getInputReadyDismantlingOrders() {
    return this.http.get(this.inventoryApiUrl + `/reports?title=inputReady`, this.setupOptions(true))
      .map(res => res.json())
      .catch(this.handleError);
  }

  getInputDone(days = 10) {
    return this.http.get(this.inventoryApiUrl + `/reports?title=inputDone&days=${days}`, this.setupOptions(true))
      .map(res => {
        const report = res.json();
        this.inventoryInputDoneRxx.next(report);
        return report;
      })
      .catch(this.handleError);
  }


  /**
   * imventory part end
   */

  private handleError(error: any) {
    console.log('Lyfront caught an error', error); // for demo purposes only
    return Observable.throw(error.json());
  }
}
