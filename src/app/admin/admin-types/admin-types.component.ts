import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-admin-types',
  templateUrl: './admin-types.component.html',
  styleUrls: ['./admin-types.component.scss']
})
export class AdminTypesComponent implements OnInit {
  types: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.typesRx
      .catch(error => Observable.of({ok: false, error}))
      .subscribe(results => this.types = results);
  }

}
