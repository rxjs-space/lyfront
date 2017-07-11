import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { AdminPartsAndWastesDialogComponent } from './admin-parts-and-wastes-dialog.component';
@Component({
  selector: 'app-admin-parts-and-wastes-sub-form',
  templateUrl: './admin-parts-and-wastes-sub-form.component.html',
  styleUrls: ['./admin-parts-and-wastes-sub-form.component.scss']
})
export class AdminPartsAndWastesSubFormComponent implements OnInit, OnDestroy {
  @Input() category: string;
  @Input() typesForm: FormGroup;
  fform: FormArray;
  title: string;
  isCollapsed: boolean;
  subscriptions: Subscription[] = [];
  isSaving = false;
  @Output() submit = new EventEmitter();
  constructor(public dialog: MdDialog) { }

  ngOnInit() {
    switch (this.category) {
      case 'parts':
        this.title = '回用件'; break;
      case 'wastes':
        this.title = '危废品'; break;
      case 'facilities':
        this.title = '收车单位'; break;
    }
    this.fform = this.typesForm.get(this.category) as FormArray;
  }

  openDialogEdit() {
    // console.log('edit');
    const nextId = this.getNextId();
    const dialogRef = this.dialog.open(AdminPartsAndWastesDialogComponent, {
      disableClose: true,
      data: {
        categoryTitle: this.title,
        nextId,
        POWs: this.fform.getRawValue()
      },
    });
    dialogRef.afterClosed().subscribe((newPOW: FormGroup) => {
      if (newPOW) {
        this.fform.push(newPOW);
        if (!this.fform.touched) {
          this.fform.markAsTouched();
        }
        if (!this.fform.dirty) {
          this.fform.markAsDirty();
        }
      }
    });

  }

  getNextId() {
    const POWs = this.fform.getRawValue(); // POWs is partsOrWastes
    const maxId = POWs.map((pow: {id: string}) => pow.id).sort((a, b) => b.localeCompare(a))[0];
    const maxIdNumber = +maxId.slice(-3);
    const nextIdNumber = maxIdNumber + 1;
    const prefix = maxId.length > 3 ? maxId.slice(0, maxId.length - 3) : '';
    function pad(str, max) {
      str = str.toString();
      return str.length < max ? pad('0' + str, max) : str;
    }
    const nextId = prefix + pad(nextIdNumber, 3);
    return nextId;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}
