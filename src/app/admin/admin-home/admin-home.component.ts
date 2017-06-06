import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  navLinks = [
    {route: 'types', label: '类型管理'},
    // {route: 'new', label: '车辆入库'},
    // {route: 'dismantling', label: '车辆出库'},
    // {route: 'survey', label: '交警验车'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
