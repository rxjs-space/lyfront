import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormUtilsService } from '../form-utils/form-utils.service';
@Component({
  selector: 'app-vehicle-details-print',
  templateUrl: './vehicle-details-print.component.html',
  styleUrls: ['./vehicle-details-print.component.scss']
})
export class VehicleDetailsPrintComponent implements OnInit {
  @Input() vehicleInput: any;
  vehicle: any;
  @Input() btity: any;
  residualValueAfterFD: number;
  constructor(private fu: FormUtilsService, private fb: FormBuilder) { }
  configForm: FormGroup;
  // rowHeightA = 1.7;
  // rowHeightB = 1.51;
  // rowHeightC = 1.38;
  // rowHeightD = 1.7;

  ngOnInit() {
    this.configForm = this.fb.group({
      rowHeightA: 1.5,
      rowHeightB: 1.3,
      rowHeightC: 1.15,
      rowHeightD: 1.6,
      rowHeightZ: 3.5
    });
    this.vehicle = JSON.parse(JSON.stringify(this.vehicleInput));
    // console.log(this.vehicle.entranceDate);
    if (this.vehicle.vehicle.brand) {
      this.vehicle.vehicle.brand = this.fu.idToName(this.vehicle.vehicle.brand, this.btity.brands);
    }
    const feesAndDeductionsSum = this.vehicle.feesAndDeductions.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
    this.residualValueAfterFD = this.vehicle.vehicle.residualValueBeforeFD - feesAndDeductionsSum;
  }

}
