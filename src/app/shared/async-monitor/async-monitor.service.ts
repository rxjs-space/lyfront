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
      value: null,
      error: null // not all holders having this property, need revise
    });
    return this.holder[key];
  }


}




/*

'validatorDuplicateVIN'
'dialogDismantlingOrder'
'dialogDismantlingOrderMark'
'insertUpdateVehicle'

*/