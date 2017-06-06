import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  attemptedUrl: string;
  host1 = 'http://localhost:3001';
  // host1 = 'https://lyback.herokuapp.com';
  isLoggedInRxx = new BehaviorSubject(false);
  isAdminRxx = new BehaviorSubject(false);
  isX = new BehaviorSubject('a');

  constructor(
    private http: Http,
    private router: Router) {
      this.isLoggedIn();
      this.isAdmin();
    }

  isLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let isLoggedIn = false;
    if (
      currentUser && 
      currentUser.token && 
      this.getJwtPayload(currentUser.token)['exp'] > (Math.ceil(Date.now() / 1000))) {
        isLoggedIn = true;
      }
    this.isLoggedInRxx.next(isLoggedIn);
    return isLoggedIn;

    // if (currentUser && currentUser.token) {
    //   const payload = this.getJwtPayload(currentUser.token);
    //   if (payload.exp < Math.ceil(Date.now() / 1000)) {
    //     return false;
    //   }
    //   return true;
    // }
    // return false;
  }

  isAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let isAdmin = false;
    if (
      currentUser && 
      currentUser.token && 
      this.getJwtPayload(currentUser.token)['sub']['roles'].indexOf('admin') > -1) {
        isAdmin = true;
      }
    this.isAdminRxx.next(isAdmin);
    return isAdmin;
  }

  getJwtPayload(token) {
    if (!token) {
      console.log('no token provided');
      return;
    }
    const parts = token.split('.');
    return JSON.parse(atob(parts[1]));
  }

  redirectAfterSuccess() {
    const url = this.attemptedUrl || '/dashboard';
    this.router.navigate([url]);
  }

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
          // const x = JSON.parse(localStorage.getItem('currentUser'));
          // console.log(x.token);
          this.redirectAfterSuccess();
          return {success: true};
        }
        return {success: false};
      })
      .catch(err => {
        if (err.status === 401) {
          return Observable.of({
            success: false,
            errorCode: 401
          });
        }
        return this.handleError(err);
      });
  }

  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.of(error.message || error);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedInRxx.next(false);
    this.isAdminRxx.next(false);
    this.router.navigate(['/login']);
  }

}
