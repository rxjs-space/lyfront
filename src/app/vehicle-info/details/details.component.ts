import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() vehicle;
  @Input() types;
  constructor() { }

  ngOnInit() {
  }

}
