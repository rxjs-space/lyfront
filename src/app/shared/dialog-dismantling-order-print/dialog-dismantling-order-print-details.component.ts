import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-dismantling-order-print-details',
  templateUrl: './dialog-dismantling-order-print-details.component.html',
  styleUrls: ['./dialog-dismantling-order-print-details.component.scss']
})
export class DialogDismantlingOrderPrintDetailsComponent implements OnInit {
  @Input() vehicle: any;
  constructor() { }

  ngOnInit() {
  }

}
