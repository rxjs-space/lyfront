import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { DisplayFunctionsService } from '../display-functions/display-functions.service';

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
  @Input() objList: {[key: string]: string}[];
  @Input() objListTitleKey: string;
  @Input() toHideInitList: Boolean;
  @Input() list: any[];
  @Input() toFilterList: Boolean = false;
  @Input() isTrueOrFalse: Boolean = false;
  @Input() toSort: Boolean = true;
  @Output() blur: EventEmitter<any> = new EventEmitter();
  widthInEm: string;
  baseList: string[];
  filteredTypesRx: Observable<string[]>;
  constructor(
    public df: DisplayFunctionsService
  ) { }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes && changes.objList && changes.objList.previousValue) {
  //     this.ngOnInit();
  //   }
  // }

  ngOnInit() {

    /* 
    
    /deep/ .s-size-input {
  width: 4em;
}

/deep/ .m-size-input .mat-input-wrapper {
  width: 6em;
}

/deep/ .l-size-input .mat-input-wrapper {
  width: 9em;
}

/deep/ .xl-size-input .mat-input-wrapper {
  width: 12em;
}

    
    
    */

    switch (this.sizeClass) {
      case 's-size-input':
        this.widthInEm = '4em'; break;
      case 'm-size-input':
        this.widthInEm = '6em'; break;
      case 'l-size-input':
        this.widthInEm = '9em'; break;
      case 'xl-size-input':
        this.widthInEm = '12em'; break;
      default:
        this.widthInEm = '10em';
    }


    let sortedList;
    switch (true) {
      case Boolean(this.objList && this.list):
        console.error('list provided is discarded in favor of the objList provided.');
        console.log('the list provided is:');
        console.log(this.list);
        // no break;
      case Boolean(this.objList):
        this.baseList = this.objList.map(item => this.objListTitleKey ? item[this.objListTitleKey] : item.name);
        break;
      case Boolean(this.list):
        this.baseList = this.list;
        break;
    }

    if (this.baseList && this.toSort) {
      sortedList = this.baseList.sort((a, b) => a.localeCompare(b, 'zh-CN'));
    } else {
      sortedList = this.baseList;
    }


    this.filteredTypesRx = !this.baseList ? null : this.formControlInput
      .valueChanges
      .startWith(null)
      // .map(v => this.filterObjListFac(this.sortObjListByName, this.hideInitList)(this.objList, v))
      .map(v => {
        if (this.toHideInitList) {
          return v ? sortedList.filter(item => new RegExp(`${v}`, 'gi').test(item)) : [];
        }
        return v ? sortedList.filter(item => new RegExp(`${v}`, 'gi').test(item)) : sortedList;
      });
  }



}
