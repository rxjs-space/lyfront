import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loading-or-error',
  templateUrl: './loading-or-error.component.html',
  styleUrls: ['./loading-or-error.component.scss']
})
export class LoadingOrErrorComponent implements OnChanges {
  @Input() httpJsonData: any;
  constructor() { }

  ngOnChanges() {
    // console.log(this.httpJsonData);
  }

}
