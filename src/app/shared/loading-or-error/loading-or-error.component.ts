import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-or-error',
  templateUrl: './loading-or-error.component.html',
  styleUrls: ['./loading-or-error.component.scss']
})
export class LoadingOrErrorComponent implements OnInit {
  @Input() httpJsonData: any;
  constructor() { }

  ngOnInit() {
  }

}
