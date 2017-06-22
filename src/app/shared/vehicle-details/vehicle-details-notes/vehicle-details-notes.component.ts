import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { DialogNewVehicleNoteComponent } from './dialog-new-vehicle-note.component';

@Component({
  selector: 'app-vehicle-details-notes',
  templateUrl: './vehicle-details-notes.component.html',
  styleUrls: ['./vehicle-details-notes.component.scss']
})
export class VehicleDetailsNotesComponent implements OnInit {

  valueChangesRx: Observable<any>;
  fform: FormGroup;
  @Input() vehicle: any;
  @Input() btity: any;
  notesFormArray: FormArray;
  subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService,
    public dialog: MdDialog
  ) { }
  ngOnInit() {
    // will rename 'remarks' to 'notes'
    const noteCtrlsArray = this.vehicle.remarks.map(remark => this.fb.group({
      fooBar: '', // when all the ctrls are disabled, the form.valid is always false
      content: [{value: remark.content, disabled: true}],
      date: [{value: remark.date, disabled: true}],
      by: [{value: remark.by, disabled: true}]
    }));

    this.notesFormArray = this.fb.array(noteCtrlsArray);

    this.fform = this.fb.group({
      remarks: this.notesFormArray,
    });

    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        // if (this.fform.valid) {
          const allV = this.fform.getRawValue();
          allV['remarks'].forEach(item => {
            delete item.fooBar;
          });
          return allV;
        // }
      });

  }

  onYesNoClose(event, index) {
    if (event) {
      (this.fform.get('remarks') as FormArray).removeAt(index);
      this.fform.markAsTouched();
      this.fform.markAsDirty();
    }
  }

  openDialogNewNote() {
    const dialogRef = this.dialog.open(DialogNewVehicleNoteComponent, {
      width: '80%',
      data: {btity: this.btity},
    });
    dialogRef.afterClosed().subscribe((newNoteForm: FormGroup) => {
      if (newNoteForm) {
        newNoteForm.get('date').disable();
        newNoteForm.get('content').disable();
        this.fform.markAsTouched(); // order 1.a
        this.fform.markAsDirty(); // order 1.b
        this.notesFormArray.push(newNoteForm); // order 2
      }
    });

  }
}
