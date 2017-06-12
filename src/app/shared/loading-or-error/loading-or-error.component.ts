import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-loading-or-error',
  templateUrl: './loading-or-error.component.html',
  styleUrls: ['./loading-or-error.component.scss']
})
export class LoadingOrErrorComponent implements OnChanges, OnInit {
  @Input() httpJsonData: any;
  @Input() needBtity = true;
  constructor(public data: DataService) { }

  ngOnInit() {

  }
  ngOnChanges() {
    // console.log(this.httpJsonData);
  }

}
