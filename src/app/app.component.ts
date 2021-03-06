import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth/auth.service';
import { DataService } from './data/data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions_: Subscription[] = [];
  title = 'app works!';
  navLinks = [];
  isLoggedInRxx: BehaviorSubject<boolean>;
  usernameRxx: BehaviorSubject<any>;
  constructor(
    private data: DataService, // this will run the constructor of DataService
    private auth: AuthService, /*public dialog: MdDialog*/) {}

  ngOnInit() {
    this.isLoggedInRxx = this.auth.isLoggedInRxx;
    (this.isLoggedInRxx as Observable<boolean>)
      .filter(v => v)
      .first()
      .subscribe(() => {
        this.data.refreshBtity();
      });
    this.usernameRxx = this.auth.usernameRxx;
    this.navLinks = [
      {route: '/dashboard', label: '主页'},
      {route: '/vehicles', label: '收车管理'},
      {route: '/dismantling', label: '拆解管理'},
      {route: '/inventory', label: '库存管理'},
      {route: '/sales', label: '销售管理'},
    ];
    const isAdmin_ = this.auth.isAdminRxx
      .subscribe(result => {
        this.navLinks = this.navLinks.filter(nl => nl.route !== '/admin');
        if (result) {
          this.navLinks.push({route: '/admin', label: '后台管理'});
        }
      });
    this.subscriptions_.push(isAdmin_);
}
  ngOnDestroy() {
    this.subscriptions_.forEach(sub_ => sub_.unsubscribe());
  }
  logout() {
    this.auth.logout();
  }



}
