import { Component, Input, OnInit } from '@angular/core';

import { FormUtilsService } from '../form-utils/form-utils.service';
@Component({
  selector: 'app-vehicle-details-print',
  templateUrl: './vehicle-details-print.component.html',
  styleUrls: ['./vehicle-details-print.component.scss']
})
export class VehicleDetailsPrintComponent implements OnInit {
  @Input() vehicle: any;
  @Input() btity: any;
  residualValueAfterFD: number;
  constructor(private fu: FormUtilsService) { }

  ngOnInit() {
    // console.log(this.vehicle.entranceDate);
    if (this.vehicle.vehicle.brand) {
      this.vehicle.vehicle.brand = this.fu.idToName(this.vehicle.vehicle.brand, this.btity.brands);
    }
    const feedAndDeductionsSum = this.vehicle.feesAndDeductions.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
    this.residualValueAfterFD = this.vehicle.vehicle.residualValueBeforeFD - feedAndDeductionsSum;
  }

}
