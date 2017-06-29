import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-details-print',
  templateUrl: './vehicle-details-print.component.html',
  styleUrls: ['./vehicle-details-print.component.scss']
})
export class VehicleDetailsPrintComponent implements OnInit {
  @Input() vehicle: any;
  residualValueAfterFD: number;
  constructor() { }

  ngOnInit() {
    // console.log(this.vehicle.entranceDate);
    const feedAndDeductionsSum = this.vehicle.feesAndDeductions.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
    this.residualValueAfterFD = this.vehicle.vehicle.residualValueBeforeFD - feedAndDeductionsSum;
  }

}
