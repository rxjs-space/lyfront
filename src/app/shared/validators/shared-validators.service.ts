import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class SharedValidatorsService {

  constructor() { }


  notListed(list: any[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      const notListed = list.indexOf(value) === -1;
      return notListed ? {'notListed': {value}} : null;
    };
  }

  notListedInObjList(objList: {[key: string]: any}[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      let notListed = true;
      for (let i = 0; i < objList.length; i++) {
        if (this.isEquivalent(objList[i], value)) {
          notListed = false;
          break;
        }
      }
      return notListed ? {'notListed': {value}} : null;
    };
  }


  isEquivalent(a, b) {
      // Create arrays of property names
      const aProps = Object.getOwnPropertyNames(a);
      const bProps = Object.getOwnPropertyNames(b);

      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length != bProps.length) {
          return false;
      }

      for (let i = 0; i < aProps.length; i++) {
          const propName = aProps[i];

          // If values of same property are not equal,
          // objects are not equivalent
          if (a[propName] !== b[propName]) {
              return false;
          }
      }

      // If we made it this far, objects
      // are considered equivalent
      return true;
  }

  isBoolean(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      const isBoolean = typeof value === 'boolean';
      return isBoolean ? null : {'notBooleanValue': {value}};
    }
  }

}
