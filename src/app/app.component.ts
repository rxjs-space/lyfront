import { Component, OnInit, OnDestroy } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions_: Subscription[] = [];
  title = 'app works!';
  navLinks = [
    {route: '/dashboard', label: '主页'},
    {route: '/vehicles', label: '车辆管理'},
    {route: '/inventory', label: '库存管理'},
    {route: '/sales', label: '销售管理'},
    // {route: '/part-pricing', label: '回用件价格'},
    // {route: '/admin', label: '系统管理员入口'},
  ];
  isLoggedIn: Boolean;
  constructor(private auth: AuthService, /*public dialog: MdDialog*/) {}
  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    const sub0_ = this.auth.isLoggedInRxx.subscribe(v => this.isLoggedIn = v);
    this.subscriptions_.push(sub0_);
}
  ngOnDestroy() {
    this.subscriptions_.forEach(sub_ => sub_.unsubscribe());
  }
  logout() {
    this.auth.logout();
  }



}
