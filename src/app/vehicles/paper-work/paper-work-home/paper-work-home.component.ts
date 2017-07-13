import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data/data.service';
@Component({
  selector: 'app-paper-work-home',
  templateUrl: './paper-work-home.component.html',
  styleUrls: ['./paper-work-home.component.scss']
})
export class PaperWorkHomeComponent implements OnInit {

  constructor(
    private backend: DataService
  ) { }

  ngOnInit() {
  }


}
