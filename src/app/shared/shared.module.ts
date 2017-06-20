import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { /*BaseRequestOptions,*/ HttpModule } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
import { RouterModule } from '@angular/router';


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
import { FormUtilsService } from './form-utils/form-utils.service';
import { DialogDismantlingOrderComponent } from './dialog-dismantling-order/dialog-dismantling-order.component';
import { LoadingOrError2Component } from './loading-or-error-2/loading-or-error-2.component';
import { ExistingDismantlingOrdersComponent } from './dialog-dismantling-order/existing-dismantling-orders.component';
import { TriggerDismantlingOrderComponent } from './dialog-dismantling-order/trigger-dismantling-order.component';
import { SharedFilterComponent } from './shared-filter/shared-filter.component';
import { DialogDismantlingOrderPrintComponent } from './dialog-dismantling-order-print/dialog-dismantling-order-print.component';
import { DialogVehicleListComponent } from './dialog-vehicle-list/dialog-vehicle-list.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { AsyncDataLoaderService } from './async-data-loader/async-data-loader.service';
import { AsyncMonitorService } from './async-monitor/async-monitor.service';
import { VehicleListStatusComponent } from './vehicle-list/vehicle-list-status.component';
import { DialogVehicleComponent } from './dialog-vehicle/dialog-vehicle.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { DialogVehicleTriggerComponent } from './dialog-vehicle/dialog-vehicle-trigger.component';
import { VehicleDetailsGeneralComponent } from './vehicle-details/vehicle-details-general/vehicle-details-general.component';
import { VehicleDetailsStatusComponent } from './vehicle-details/vehicle-details-status/vehicle-details-status.component';
import { VehicleDetailsVehicleComponent } from './vehicle-details/vehicle-details-vehicle/vehicle-details-vehicle.component';
import { VehicleDetailsOwnerAgentComponent } from './vehicle-details/vehicle-details-owner-agent/vehicle-details-owner-agent.component';


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
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    NotFoundComponent,
    LoadingOrErrorComponent,
    AutocompleteComboComponent,
    DialogYesOrNoComponent,
    DialogDismantlingOrderComponent,
    LoadingOrError2Component,
    ExistingDismantlingOrdersComponent,
    TriggerDismantlingOrderComponent,
    SharedFilterComponent,
    DialogDismantlingOrderPrintComponent,
    DialogVehicleListComponent,
    VehicleListComponent,
    VehicleListStatusComponent,
    DialogVehicleComponent,
    VehicleDetailsComponent,
    DialogVehicleTriggerComponent,
    VehicleDetailsGeneralComponent,
    VehicleDetailsStatusComponent,
    VehicleDetailsVehicleComponent,
    VehicleDetailsOwnerAgentComponent
  ],
  exports: [
    CommonModule,
    HttpModule,
    ...mdModules,
    NotFoundComponent,
    ReactiveFormsModule,
    LoadingOrErrorComponent,
    LoadingOrError2Component,
    AutocompleteComboComponent,
    TriggerDismantlingOrderComponent,
    SharedFilterComponent,
    VehicleListComponent,
    VehicleDetailsComponent,
    DialogVehicleTriggerComponent
  ],
  entryComponents: [
    DialogYesOrNoComponent,
    DialogDismantlingOrderComponent,
    DialogDismantlingOrderPrintComponent,
    DialogVehicleListComponent,
    DialogVehicleComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        SharedValidatorsService,
        DisplayFunctionsService,
        FormUtilsService,
        AsyncDataLoaderService,
        AsyncMonitorService
      ]
    };
  }
}
