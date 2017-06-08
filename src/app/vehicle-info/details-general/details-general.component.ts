import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { AsyncMonitorService } from '../../shared/async-monitor/async-monitor.service';

@Component({
  selector: 'app-details-general',
  templateUrl: './details-general.component.html',
  styleUrls: ['./details-general.component.scss']
})
export class DetailsGeneralComponent implements OnInit {
  @Input() titles;
  @Input() types;
  @Input() formGroupInput: FormGroup;
  @Input() isNew: Boolean;

  constructor(private asyncMon: AsyncMonitorService) { }

  ngOnInit() {
  }


}
