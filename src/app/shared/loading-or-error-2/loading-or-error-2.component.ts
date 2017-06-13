import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-or-error-2',
  templateUrl: './loading-or-error-2.component.html',
  styleUrls: ['./loading-or-error-2.component.scss']
})
export class LoadingOrError2Component implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
