import { Component, Input, OnInit } from '@angular/core';
import { FormUtilsService } from '../form-utils/form-utils.service';
@Component({
  selector: 'app-dialog-dismantling-order-print-details',
  templateUrl: './dialog-dismantling-order-print-details.component.html',
  styleUrls: ['./dialog-dismantling-order-print-details.component.scss']
})
export class DialogDismantlingOrderPrintDetailsComponent implements OnInit {
  @Input() vehicleInput: any;
  @Input() btity: any;
  @Input() dismantlingOrder: any;
  vehicle: any;
  constructor(private fu: FormUtilsService) { }

  ngOnInit() {
    this.vehicle = JSON.parse(JSON.stringify(this.vehicleInput));
    this.vehicle.vehicle.brand = this.fu.idToName(this.vehicle.vehicle.brand, this.btity.brands);
  }

}
