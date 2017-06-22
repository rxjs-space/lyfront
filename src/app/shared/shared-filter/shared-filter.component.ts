import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shared-filter',
  templateUrl: './shared-filter.component.html',
  styleUrls: ['./shared-filter.component.scss']
})
export class SharedFilterComponent implements OnInit {
  @Input() optionsArr: any;
  @Output() filter = new EventEmitter();
  @Output() valueChanges = new EventEmitter();
  filterForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // console.log(this.optionsArr);
    const formGroupObj = this.optionsArr.reduce((acc, curr) => {
      acc[curr.title] = curr.initValue ? curr.initValue : 1;
      return acc;
    }, {});
    this.filterForm = this.fb.group(formGroupObj);
    this.filterForm.valueChanges
      .subscribe(v => this.valueChanges.emit(v));
  }

  onSubmit() {
    this.filter.emit(this.filterForm.value);
  }

}
