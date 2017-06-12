import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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
    console.log('saving', JSON.stringify(event.patches));
    const patches = event.patches;
    this.data.updateTypes(patches)
      .catch(err => Observable.of({
        ok: false,
        err
      }))
      .subscribe(result => {
        if (!result.ok) {console.log('error occured when updating types:', result.err); }
        const oldBtity = JSON.parse(JSON.stringify(this.data.btityRxx.getValue()));
        const newBtity = Object.assign(oldBtity, {types: event.newTypes});
        this.data.btityRxx.next(newBtity);
        console.log('update types result', result);

      })
  }

}
