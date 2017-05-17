import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  navLinks = [
    {route: 'list', label: '车辆列表'},
    {route: 'new', label: '车辆入库'},
  ];

  resolvedData: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.resolvedData = data;
    });
  }

}
