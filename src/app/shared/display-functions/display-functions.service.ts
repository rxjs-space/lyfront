import { Injectable } from '@angular/core';

@Injectable()
export class DisplayFunctionsService {

  constructor() { }

  dBoolean(ctrlValue: any) {
    return ctrlValue ? '是' : '否';
  }

  dName(ctrlValue: any) {
    return ctrlValue.name;
  }

}
