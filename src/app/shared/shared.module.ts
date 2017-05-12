import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule, MdCheckboxModule, MdInputModule, MdAutocompleteModule,
  MdSidenavModule, MdDialogModule, MdToolbarModule, MdIconModule,
  MdCardModule, MdMenuModule, MdGridListModule, MdListModule,
  MdTabsModule, MdSelectModule, MdProgressSpinnerModule, MdRadioModule,

} from '@angular/material';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedValidatorsService } from './validators/shared-validators.service';
import { LoadingOrErrorComponent } from './loading-or-error/loading-or-error.component';


const mdModules = [
    MdCheckboxModule,
    MdButtonModule,
    MdInputModule,
    MdAutocompleteModule,
    MdSidenavModule,
    MdDialogModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdMenuModule,
    MdGridListModule,
    MdListModule,
    MdTabsModule,
    MdSelectModule,
    MdProgressSpinnerModule,
    MdRadioModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ...mdModules,
    ReactiveFormsModule
  ],
  declarations: [NotFoundComponent, LoadingOrErrorComponent],
  exports: [
    CommonModule,
    HttpModule,
    ...mdModules,
    NotFoundComponent,
    ReactiveFormsModule,
    LoadingOrErrorComponent
  ],
  providers: [
    SharedValidatorsService
  ]
})
export class SharedModule { }
