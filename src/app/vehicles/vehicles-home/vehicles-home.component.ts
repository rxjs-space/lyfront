import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles-home',
  templateUrl: './vehicles-home.component.html',
  styleUrls: ['./vehicles-home.component.scss']
})
export class VehiclesHomeComponent implements OnInit {
  navLinks = [
    {route: 'entrance', label: '进场管理'},
    {route: 'survey', label: '验车管理'},
    {route: 'paper-work', label: '手续管理'},
    // {route: 'dismantling', label: '拆解管理'},
    {route: 'payment', label: '付款管理'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
