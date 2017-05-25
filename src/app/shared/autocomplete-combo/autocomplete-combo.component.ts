import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

// import { DisplayFunctionsService } from '../display-functions/display-functions.service';

/**
 * consumer of this component provide either an objList or a list
 */

@Component({
  selector: 'app-autocomplete-combo',
  templateUrl: './autocomplete-combo.component.html',
  styleUrls: ['./autocomplete-combo.component.scss']
})
export class AutocompleteComboComponent implements OnInit {
  @Input() placeholderInput: string;
  @Input() formControlInput: FormControl;
  @Input() sizeClass: string;
  @Input() objList: {name: string}[];
  @Input() hideInitList: Boolean;
  @Input() list: string[];
  @Input() toFilterList: Boolean = true;
  filteredTypesRx: Observable<string[]>;
  constructor(
    /*public df: DisplayFunctionsService*/
  ) { }

  ngOnInit() {
    if (this.objList && this.list) {
      console.error('list provided is discarded in favor of the objList provided.');
      console.log('the list provided is:');
      console.log(this.list);
    }
    if (this.objList) {
      this.list = this.objList.map(item => item.name);
    }
    const sortedList = this.list.sort((a, b) => a.localeCompare(b, 'zh-CN'));
            console.log(sortedList);

    this.filteredTypesRx = this.formControlInput
      .valueChanges
      .startWith(null)
      // .map(v => this.filterObjListFac(this.sortObjListByName, this.hideInitList)(this.objList, v))
      .map(v => {
        if (this.hideInitList) {
          return v ? sortedList.filter(item => new RegExp(`^${v}`, 'gi').test(item)) : [];
        }
        return v ? sortedList.filter(item => new RegExp(`^${v}`, 'gi').test(item)) : sortedList;
      });
  }



  // filterObjListFac(sortFn, hideInitList?: Boolean) {
  //   return (objList: {name: string}[], value: any): any[] => {
  //     const sortedObjList = sortFn(objList);
  //     if (hideInitList) {
  //       return value ? sortedObjList.filter(item => new RegExp(`^${value}`, 'gi').test(item.name)) : [];
  //     } else {
  //       return value ? sortedObjList.filter(item => new RegExp(`^${value}`, 'gi').test(item.name)) : sortedObjList;
  //     }
  //   }
  // }

  // sortObjListByName(objList: {name: string}[]) {
  //   return objList.sort((a, b) => a.name.localeCompare(b.name));
  // }

}
