import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-do-home',
  templateUrl: './do-home.component.html',
  styleUrls: ['./do-home.component.scss']
})
export class DoHomeComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit() {
    // this.data.getVehicles({dismantling: true}).subscribe(console.log);
  }

}
