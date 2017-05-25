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
  isLoggedInRxx: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  constructor(
    private http: Http,
    private router: Router) { }

  isLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const payload = this.getJwtPayload(currentUser.token);
      if (payload.exp < Math.ceil(Date.now() / 1000)) {return false; }
      this.isLoggedInRxx.next(true);
      return true;
    }
    this.isLoggedInRxx.next(false);
    return false;
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
    this.router.navigate(['/login']);
  }

}
