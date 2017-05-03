import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule, MdCheckboxModule, MdInputModule, MdAutocompleteModule,
  MdSidenavModule, MdDialogModule, MdToolbarModule, MdIconModule,
  MdCardModule,
} from '@angular/material';
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
    ReactiveFormsModule,
    HttpModule,
    ...mdModules
  ],
  declarations: [NotFoundComponent],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    ...mdModules,
    NotFoundComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
