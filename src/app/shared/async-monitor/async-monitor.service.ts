import { Injectable } from '@angular/core';

@Injectable()
export class AsyncMonitorService {
  progressing = {
    validatorDuplicateVIN: false
  };
  constructor() { }

}
