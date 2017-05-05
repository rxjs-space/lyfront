import { Component } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  navLinks = [
    {route: '/dashboard', label: '主页'},
    {route: '/vehicles', label: '车辆'},
    {route: '/part-inventory', label: '回用件库存'},
    {route: '/part-sales', label: '回用件销售'},
    // {route: '/admin', label: '系统管理员入口'},
  ]




}
