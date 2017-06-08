import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';

import { DataService } from '../../data/data.service';
import { AsyncMonitorService } from '../async-monitor/async-monitor.service';


@Injectable()
export class SharedValidatorsService {

  constructor(private data: DataService,
    private asyncMon: AsyncMonitorService) { }

  duplicateVIN(formId: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const vin = control.value;
      const errorKey = 'duplicateVIN';
      this.asyncMon.progressing.validatorDuplicateVIN = true;
      return this.data.getVehicleByVIN(vin, true)
        .map(r => {
          this.asyncMon.progressing.validatorDuplicateVIN = false;
          const _id = r ? r._id : null;
          return _id ? {[errorKey]: _id} : null;
        }).catch(err => {
            // if 404, that vin does not exist
            // if other http err, will handle at other places
            this.asyncMon.progressing.validatorDuplicateVIN = false;
            return null;
        })
    };
  }

  notMatchingOtherControl(otherCtrl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const otherValue = otherCtrl.value;
      const value = control.value;
      if (!value) {return null; }
      const match = otherValue === value;
      return match ? null : {'notMatching': 'value not match'}
    };
  }

  notListedButCanBeEmpty(list: any[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      if (!value) {return null; }
      const notListed = list.indexOf(value) === -1;
      return notListed ? {'notListed': value} : null;
    };
  }




  notListedBasedOnOtherControlTFButCanBeEmpty(otherControlName: string, lists: any[][]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let notListed;
      const thisControl = control;
      const thisValue = thisControl.value;
      if (!thisValue) {return null; }
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
