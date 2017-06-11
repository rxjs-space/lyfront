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

  constructor(public data: DataService) { }

  ngOnInit() {

  }

  onSave(event) {
    console.log('saving', JSON.stringify(event));
    const patches = event;
    this.data.updateTypes(patches)
      .catch(err => Observable.of(err))
      .subscribe(result => {
        console.log('update types result', result);

      })
  }

}
