import { Component, Input, OnInit } from '@angular/core';
import { SubHolder } from '../async-data-loader';
@Component({
  selector: 'app-loading-or-error-3',
  templateUrl: './loading-or-error-3.component.html',
  styleUrls: ['./loading-or-error-3.component.scss']
})
export class LoadingOrError3Component implements OnInit {
  @Input() holder: SubHolder;
  constructor() { }

  ngOnInit() {
  }

}
