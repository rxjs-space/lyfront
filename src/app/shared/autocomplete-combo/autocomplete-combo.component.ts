import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { DisplayFunctionsService } from '../display-functions/display-functions.service';

@Component({
  selector: 'app-autocomplete-combo',
  templateUrl: './autocomplete-combo.component.html',
  styleUrls: ['./autocomplete-combo.component.scss']
})
export class AutocompleteComboComponent implements OnInit {
  @Input() placeholderInput;
  @Input() formControlInput: FormControl;
  @Input() sizeClass;
  @Input() objList;
  filteredTypesRx: Observable<any>;
  constructor(
    public df: DisplayFunctionsService
  ) { }

  ngOnInit() {
    this.filteredTypesRx = this.formControlInput
      .valueChanges
      .startWith(null)
      .map(v => this.filterObjListFac(this.sortObjListByName)(this.objList, v));
  }

  filterObjListFac(sortFn, hideInitList?: Boolean) {
    return (objList: {name: string}[], value: any): any[] => {
      const sortedObjList = sortFn(objList);
      if (hideInitList) {
        return value ? sortedObjList.filter(item => new RegExp(`^${value}`, 'gi').test(item.name)) : [];
      } else {
        return value ? sortedObjList.filter(item => new RegExp(`^${value}`, 'gi').test(item.name)) : sortedObjList;
      }
    }
  }

  sortObjListByName(objList: {name: string}[]) {
    return objList.sort((a, b) => a.name.localeCompare(b.name));
  }

}


/*

  valueChangesToFilteredObjListRx(fg: FormGroup, ctrlPath: string, objList: {[key: string]: any}[], filterFn) {
    return fg.get(ctrlPath).valueChanges
      .startWith(null)
      .map(value => filterFn(objList, value));
  }

    this.filteredVTypesRx = this.valueChangesToFilteredObjListRx(
      this.vehicleForm, 'vehicle.vehicleType', this.types.vehicleTypes, this.filterObjListFac(this.sortObjListByName)
    );

  filterObjListFac(sortFn, hideInitList?: Boolean) {
    return (objList: {name: string}[], value: any): any[] => {
      const sortedObjList = sortFn(objList);
      if (hideInitList) {
        return value ? sortedObjList.filter(item => new RegExp(`^${value}`, 'gi').test(item.name)) : [];
      } else {
        return value ? sortedObjList.filter(item => new RegExp(`^${value}`, 'gi').test(item.name)) : sortedObjList;
      }
    }
  }

  sortObjListByName(objList: {name: string}[]) {
    return objList.sort((a, b) => a.name.localeCompare(b.name));
  }
*/