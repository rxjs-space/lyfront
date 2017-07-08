import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  navLinks = [
    {route: 'parts-and-wastes', label: '零废目录'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
