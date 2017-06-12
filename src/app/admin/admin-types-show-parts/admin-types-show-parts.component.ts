import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { DialogPartComponent } from '../dialog-part/dialog-part.component';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-admin-types-show-parts',
  templateUrl: './admin-types-show-parts.component.html',
  styleUrls: ['./admin-types-show-parts.component.scss'],
})
export class AdminTypesShowPartsComponent implements OnInit, OnDestroy {
  @Input() formGroupInput: FormArray;
  subscriptions: Subscription[] = [];
  nextIdRxx = new BehaviorSubject('');
  @Input() title: string;
  @Input() type: string;
  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

  getNextId() {
    const parts = this.formGroupInput.getRawValue();
    const maxId = parts.map((p: {id: string}) => p.id).sort((a, b) => b.localeCompare(a))[0];
    const maxIdNumber = +maxId.slice(-3);
    const nextIdNumber = maxIdNumber + 1;
    function pad(str, max) {
      str = str.toString();
      return str.length < max ? pad("0" + str, max) : str;
    }
    let prefix;
    switch (this.type) {
      case 'parts': prefix = 'p'; break;
      case 'wastes': prefix = 'w'; break;
    }
    const nextId = prefix + pad(nextIdNumber, 3);
    return nextId;
  }


  openDialogNewPart() {
    const nextId = this.getNextId();
    const dialogRef = this.dialog.open(DialogPartComponent, {
      data: {nextId, parts: this.formGroupInput.getRawValue()},
    });
    const dialogSub_ = dialogRef.afterClosed().subscribe((newPart: FormGroup) => {
      if (newPart) {
        this.formGroupInput.push(newPart);
        this.formGroupInput.markAsTouched();
        this.formGroupInput.markAsDirty();
      }
    });
    this.subscriptions.push(dialogSub_);
  }


}
