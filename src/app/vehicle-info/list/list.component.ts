import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private isLoading: Boolean = true;
  private isError: Boolean = null;
  private vList: any[];
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getVehicles().subscribe(data => {
      this.isLoading = false;
      if (data.ok === false) {
        this.isError = true;
      }
      console.log(JSON.stringify(data, undefined, 2));
      this.vList = data;
    });
  }

  calculateDimantlingStatus(latestDismantlingOrder: {orderDate: any, actualFinishDate: any}) {
    let dStatus;
    switch (true) {
      case !latestDismantlingOrder:
        dStatus = '计划未下达';
        break;
      case !!latestDismantlingOrder && !!latestDismantlingOrder.actualFinishDate:
        dStatus = '完成';
        break;
      case !!latestDismantlingOrder && !!latestDismantlingOrder.orderDate:
        dStatus = '进行中';
        break;
    }
    return dStatus;
  }

}
