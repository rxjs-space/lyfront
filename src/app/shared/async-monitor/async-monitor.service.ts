import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AsyncMonitorService {
  holder = {};
  progressing = {
    validatorDuplicateVIN: false
  };
  constructor() { }

  init(key) {
    if (this.holder[key]) {return this.holder[key]; }
    this.holder[key] = new BehaviorSubject({
      done: true,
      value: null
    });
    return this.holder[key]
  }

  gget(key) {
    if (!this.holder[key]) {throw new Error(`no property in the holder named as ${key}`); }
    return this.holder[key];
  }

}
