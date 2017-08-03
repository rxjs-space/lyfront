import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-home',
  templateUrl: './inventory-home.component.html',
  styleUrls: ['./inventory-home.component.scss']
})
export class InventoryHomeComponent implements OnInit {
  navLinks = [
    {route: 'input', label: '入库管理'},
    {route: 'output', label: '出库管理'},
    {route: 'current', label: '当前库存'},
  ];
  constructor() { }

  ngOnInit() {
  }

}

