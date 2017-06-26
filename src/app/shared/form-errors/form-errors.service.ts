import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class FormErrorsService {
  formErrorsRxxDict = {};
  constructor() { }
  ini(formName: string) {
    if (!this.formErrorsRxxDict[formName]) {
      this.formErrorsRxxDict[formName] = new BehaviorSubject(null);
    }
    return this.formErrorsRxxDict[formName]
  }

  destroy(formName: string) {
    delete this.formErrorsRxxDict[formName];
  }
}
