import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.scss']
})
export class ListStatusComponent implements OnInit {
  @Input() vehicle: any;
  mofcomCertStatus: any;
  surveyStatus: any;
  dismantlingStatus: any;
  constructor() { }

  ngOnInit() {
    switch (true) {
      case this.vehicle.status.mofcomCertReady.done:
        this.mofcomCertStatus = '已打印'; break;
      case this.vehicle.status.mofcomEntry.done:
        this.mofcomCertStatus = '已录入未打印'; break;
      default:
        this.mofcomCertStatus = '未录入';
    }

    switch (true) {
      case this.vehicle.status.secondSurvey.done:
        this.surveyStatus = '二次验车'; break;
      case this.vehicle.status.firstSurvey.done:
        this.surveyStatus = '一次验车未二次验车'; break;
      default:
        this.surveyStatus = '未验车';
    }

    switch(true) {
      case this.vehicle.status.dismantled.done:
        this.dismantlingStatus = '彻底拆解'; break;
      case this.vehicle.dismantling:
        this.dismantlingStatus = '拆解中'; break;
      default:
        this.dismantlingStatus = '未拆解';
    }
  }

}
