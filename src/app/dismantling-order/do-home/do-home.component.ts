import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';


@Component({
  selector: 'app-do-home',
  templateUrl: './do-home.component.html',
  styleUrls: ['./do-home.component.scss']
})
export class DoHomeComponent implements OnInit {
  reports: any;
  constructor(public data: DataService) { }

  ngOnInit() {
    // this.data.getVehicles({dismantling: true}).subscribe(console.log);
    this.getReports();
  }

  getReports() {
    this.reports = null;
    this.data.dismantlingOrderReports()
      .first()
      .catch(error => Observable.of({
        ok: false, error
      }))
      .subscribe(res => this.reports = res);
  }

}
