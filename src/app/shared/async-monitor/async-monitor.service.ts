import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AsyncMonitorService {
  holder = {};
  progressing = {
    validatorDuplicateVIN: false
  };
  constructor() { }

  init(key): BehaviorSubject<any> {
    if (this.holder[key]) {return this.holder[key]; }
    this.holder[key] = new BehaviorSubject({
      done: true,
      value: null
    });
    return this.holder[key];
  }


}


  // asyncMonitorId = 'dialogDismantlingOrder';
  // asyncMonitorId = 'dialogDismantlingOrderMark';
