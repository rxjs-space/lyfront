import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdAutocompleteModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    MdInputModule,
    MdAutocompleteModule,
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    MdInputModule,
    MdAutocompleteModule,
  ]
})
export class SharedModule { }
