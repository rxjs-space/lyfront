import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private isLoading: Boolean = true;
  private isError: Boolean = null;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getVehicles().subscribe(data => {
      this.isLoading = false;
      if (data.ok === false) {
        this.isError = true;
      }
      console.log(JSON.stringify(data, undefined, 2));
    });
  }

}
