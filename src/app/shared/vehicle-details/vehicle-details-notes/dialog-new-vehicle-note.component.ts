import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dialog-new-vehicle-note',
  templateUrl: './dialog-new-vehicle-note.component.html',
  styleUrls: ['./dialog-new-vehicle-note.component.scss']
})
export class DialogNewVehicleNoteComponent implements OnInit {
  noteForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<DialogNewVehicleNoteComponent>,
    public fb: FormBuilder,
    private auth: AuthService,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any) { }

  ngOnInit() {
    this.noteForm = this.fb.group({
      date: [(new Date()).toISOString().slice(0, 10)],
      by: [this.auth.getUserId()],
      content: ['', [Validators.required]],
    });
  }

}










