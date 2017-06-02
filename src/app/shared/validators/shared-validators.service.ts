import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class SharedValidatorsService {

  constructor() { }


  notListed(list: any[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      const notListed = list.indexOf(value) === -1;
      return notListed ? {'notListed': value} : null;
    };
  }

  // requiredBasedOnOtherControlMatchingValue(otherControlName: string, valueToMatch: any): ValidatorFn {
  //   return (control: AbstractControl): {[key: string]: any} => {
  //     const thisControl = control;
  //     const thisValue = thisControl.value;
  //     const parentControl = thisControl.parent;
  //     if (!parentControl) return null;
  //     const otherControl = thisControl.parent.get(otherControlName) as FormControl;
  //     if (!otherControl) throw new Error('requiredBasedOnOtherControlMatchingValue validator: incorrect otherControlName.')
  //     const otherValue = otherControl.value;
  //     console.log('value matching', otherValue === valueToMatch);
  //     console.log('empty value', !thisValue);
  //     // following return should happen in next tick, but how?
  //     return ((otherValue === valueToMatch) && !thisValue) ? {'requiredBasedOnOtherControl': otherControlName + ' is ' + valueToMatch} : null;
  //   }
  // }

  notListedBasedOnOtherControlTF(otherControlName: string, lists: any[][]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let notListed;
      const thisControl = control;
      const thisValue = thisControl.value;
      const parentControl = thisControl.parent;
      if (!parentControl) return null;
      const otherControlTF = thisControl.parent.get(otherControlName) as FormControl;
      if (!otherControlTF) throw new Error('notListedBasedOnOtherControl validator: incorrect otherControlName.')
      const otherValueTF = otherControlTF.value;
      notListed = lists[Number(otherValueTF)].indexOf(thisControl.value) === -1;
      return notListed ? {'notListed': thisValue} : null;
    }
  }

  notListedPicky(possibleValues: any[], lists: any[][]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (possibleValues.length !== lists.length) {
        throw (new Error('lengths for possibleValues and lists are different.'));
      }
      const value = control.value;
      let notListed;
      for (let i = 0; i < possibleValues.length; i++) {
        console.log(value);
        if (value === possibleValues[i]) {
          notListed = lists[i].indexOf(value) === -1;
          break;
        }
      }
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
