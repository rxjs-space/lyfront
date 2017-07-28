import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dismantling-pre-dismantling',
  templateUrl: './dismantling-pre-dismantling.component.html',
  styleUrls: ['./dismantling-pre-dismantling.component.scss']
})
export class DismantlingPreDismantlingComponent implements OnInit {
  @Input() report: any;
  @Input() btity: any;
  isCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

}
