import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  navLinks = [
    {route: '.', label: '车辆列表'},
    {route: 'new', label: '车辆入库'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
