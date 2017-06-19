import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
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

  duplicateName(names: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const newName = control.value;
      const hasDuplicate = names.indexOf(newName) > -1;
      return hasDuplicate ? {duplicateName: newName} : null;
    };
  }

  requiredBasedOnAnotherControlAndItsValue(anotherControlName, anotherControlMatchingValue): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const parentControl = control.parent;
      if (!parentControl) {return null; }
      const anotherControl = parentControl.get(anotherControlName);
      if (!anotherControl) {return null; }
      const anotherControlHasTheValue = anotherControl.value === anotherControlMatchingValue;
      const empty = !control.value;
      return (anotherControlHasTheValue && empty) ? {required: true} : null;
    };
  }

  /*
    if control.parent.value === {id: 'p001', name: 'abc'}
      and objArray === [{id: 'p001', name: 'abc'}]
      (same name, same id)
      return null
    if control.parent.value === {id: 'p002', name: 'abc'}
      and objArray === [{id: 'p001', name: 'abc'}]
      (same name, different id)
      return error
    if control.parent.value === {id: 'p002', name: 'xyz'}
      and objArray === [{id: 'p001', name: 'abc'}]
      (diff name, different id, or new id 'p002' dose not exist in objArray)
      return null
  */
  duplicateNameInObjArray(objArray: {[key: string]: any}[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const parentControl = control.parent;
      if (!parentControl) {return null; }
      const obj = {
        id: (control.parent as FormGroup).get('id').value,
        name: control.value
      };
      const duplicateNameCorrespondingIndex = objArray.map(o => o.name).indexOf(obj.name);
      const duplicateNameCorrespondingId = 
        duplicateNameCorrespondingIndex === -1 ? null : objArray[duplicateNameCorrespondingIndex].id;
      // console.log('duplicateNameCorrespondingId', duplicateNameCorrespondingId);
      // console.log('obj.id', obj.id);
      const hasDuplicate = duplicateNameCorrespondingId === null ? false : (
        duplicateNameCorrespondingId === obj.id ? false : true);
      // console.log('hasDuplicate', hasDuplicate);
      return hasDuplicate ? {'duplicateNameInObjArray': obj.name} : null;
      // return null;
    }
  }

  duplicateVINAsync(/*formId: string*/): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const vin = control.value;
      const errorKey = 'duplicateVIN';
      this.asyncMon.progressing.validatorDuplicateVIN = true;
      const asyncMon = this.asyncMon.init('validatorDuplicateVIN');
      asyncMon.next({
        done: false,
        value: null
      })
      return this.data.getVehicleByVIN(vin, true)
        .map(r => {
          this.asyncMon.progressing.validatorDuplicateVIN = false;
          const _id = r ? r._id : null;
          asyncMon.next({
            done: true,
            value: false
          });
          return _id ? {[errorKey]: _id} : null;
        }).catch(err => {
            // if 404, that vin does not exist
            // if other http err, will handle at other places
            this.asyncMon.progressing.validatorDuplicateVIN = false;

            return Observable.of(null)
              .do(() => {
                asyncMon.next({
                  done: true,
                  value: true
                });
              });
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

  shouldBeBoolean(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      const isBoolean = typeof value === 'boolean';
      return isBoolean ? null : {'shouldBeBoolean': {value}};
    }
  }

}
