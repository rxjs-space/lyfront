import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrance-reports',
  templateUrl: './entrance-reports.component.html',
  styleUrls: ['./entrance-reports.component.scss']
})
export class EntranceReportsComponent implements OnInit {
  @Input() reports;
  constructor() { }

  ngOnInit() {
  }

}
