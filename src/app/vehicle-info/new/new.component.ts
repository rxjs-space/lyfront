import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../data/data.service';
import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';
import { DisplayFunctionsService } from '../../shared/display-functions/display-functions.service';

@Component({
  selector: 'app-vehicle-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  vehicleForm: FormGroup;
  resolvedDataP: any;
  types: any;
  titles: any;
  zip_: Subscription;
  zipData: any;

  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private route: ActivatedRoute,
    public df: DisplayFunctionsService) { }

/*

部分项目需要重复输入对比确认

*/

  ngOnInit() {

    this.zip_ = this.route.params.switchMap(params => {
      return Observable.zip(
        this.data.typesRx,
        this.data.titlesRx,
        (types, titles) => ({
          types, titles
        }));
    })
      .catch(error => Observable.of({ok: false, error}))
      .subscribe(zipData => this.zipData = zipData);




  }

}
