import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCheckboxModule, MdInputModule, MdAutocompleteModule,
  MdSidenavModule, MdDialogModule, MdToolbarModule, MdIconModule,
  MdCardModule,
} from '@angular/material';
import { guards } from './guards';
import { NotFoundComponent } from './not-found/not-found.component';

const mdModules = [
    MdButtonModule,
    MdInputModule,
    MdAutocompleteModule,
    MdSidenavModule,
    MdDialogModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    ...mdModules
  ],
  declarations: [NotFoundComponent],
  exports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    ...mdModules,
    NotFoundComponent
  ],
  providers: [
    ...guards
  ]
})
export class SharedModule { }
