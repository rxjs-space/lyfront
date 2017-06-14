import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { /*BaseRequestOptions,*/ HttpModule } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';


import {
  MdButtonModule, MdCheckboxModule, MdInputModule, MdAutocompleteModule,
  MdSidenavModule, MdDialogModule, MdToolbarModule, MdIconModule,
  MdCardModule, MdMenuModule, MdGridListModule, MdListModule,
  MdTabsModule, MdSelectModule, MdProgressSpinnerModule, MdRadioModule,
} from '@angular/material';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

// import { fakeBackendProvider } from './fake-backend';


import { SharedValidatorsService } from './validators/shared-validators.service';
import { LoadingOrErrorComponent } from './loading-or-error/loading-or-error.component';
import { DisplayFunctionsService } from './display-functions/display-functions.service';
import { AutocompleteComboComponent } from './autocomplete-combo/autocomplete-combo.component';
import { DialogYesOrNoComponent } from './dialog-yes-or-no/dialog-yes-or-no.component';
import { AsyncMonitorService } from './async-monitor/async-monitor.service';
import { FormUtilsService } from './form-utils/form-utils.service';
import { DialogDismantlingOrderComponent } from './dialog-dismantling-order/dialog-dismantling-order.component';
import { LoadingOrError2Component } from './loading-or-error-2/loading-or-error-2.component';
import { ExistingDismantlingOrdersComponent } from './dialog-dismantling-order/existing-dismantling-orders.component';
import { TriggerDismantlingOrderComponent } from './dialog-dismantling-order/trigger-dismantling-order.component';


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
  declarations: [
    NotFoundComponent,
    LoadingOrErrorComponent,
    AutocompleteComboComponent,
    DialogYesOrNoComponent,
    DialogDismantlingOrderComponent,
    LoadingOrError2Component,
    ExistingDismantlingOrdersComponent,
    TriggerDismantlingOrderComponent
  ],
  exports: [
    CommonModule,
    HttpModule,
    ...mdModules,
    NotFoundComponent,
    ReactiveFormsModule,
    LoadingOrErrorComponent,
    AutocompleteComboComponent,
    TriggerDismantlingOrderComponent
  ],
  entryComponents: [
    DialogYesOrNoComponent,
    DialogDismantlingOrderComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        SharedValidatorsService,
        DisplayFunctionsService,
        AsyncMonitorService,
        FormUtilsService
      ]
    };
  }
}
