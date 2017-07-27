import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dismantling-order-details',
  templateUrl: './dismantling-order-details.component.html',
  styleUrls: ['./dismantling-order-details.component.scss']
})
export class DismantlingOrderDetailsComponent implements OnInit {
  @Input() doForm: FormGroup;
  @Input() titles: any;
  @Output() doFormSubmit = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.doFormSubmit.emit('anything');
  }

}
