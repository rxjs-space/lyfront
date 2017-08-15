import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardVehiclesComponent } from './dashboard-vehicles/dashboard-vehicles.component';
import { DashboardInventoryComponent } from './dashboard-inventory/dashboard-inventory.component';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { DashboardVehiclesDailyClearComponent } from './dashboard-vehicles/dashboard-vehicles-daily-clear/dashboard-vehicles-daily-clear.component';
import { DashboardVehiclesCurrentStatesComponent } from './dashboard-vehicles/dashboard-vehicles-current-states/dashboard-vehicles-current-states.component';
import { DashboardVehiclesDailyClearEntranceComponent } from './dashboard-vehicles/dashboard-vehicles-daily-clear/dashboard-vehicles-daily-clear-entrance/dashboard-vehicles-daily-clear-entrance.component';
import { DashboardVehiclesDailyClearDismantlingComponent } from './dashboard-vehicles/dashboard-vehicles-daily-clear/dashboard-vehicles-daily-clear-dismantling/dashboard-vehicles-daily-clear-dismantling.component';
import { DashboardVehiclesCurrentStatesVehiclesCountByDismantlingComponent } from './dashboard-vehicles/dashboard-vehicles-current-states/dashboard-vehicles-current-states-vehicles-count-by-dismantling/dashboard-vehicles-current-states-vehicles-count-by-dismantling.component';
import { DashboardVehiclesCurrentStatesVehiclesCountByMofcomComponent } from './dashboard-vehicles/dashboard-vehicles-current-states/dashboard-vehicles-current-states-vehicles-count-by-mofcom/dashboard-vehicles-current-states-vehicles-count-by-mofcom.component';
import { DashboardVehiclesCurrentStatesVehiclesCountBySurveyComponent } from './dashboard-vehicles/dashboard-vehicles-current-states/dashboard-vehicles-current-states-vehicles-count-by-survey/dashboard-vehicles-current-states-vehicles-count-by-survey.component';
import { DashboardDismantlingComponent } from './dashboard-dismantling/dashboard-dismantling.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    DashboardVehiclesComponent,
    DashboardInventoryComponent,
    DashboardSalesComponent,
    DashboardVehiclesDailyClearComponent,
    DashboardVehiclesCurrentStatesComponent,
    DashboardVehiclesDailyClearEntranceComponent,
    DashboardVehiclesDailyClearDismantlingComponent,
    DashboardVehiclesCurrentStatesVehiclesCountByDismantlingComponent,
    DashboardVehiclesCurrentStatesVehiclesCountByMofcomComponent,
    DashboardVehiclesCurrentStatesVehiclesCountBySurveyComponent,
    DashboardDismantlingComponent
  ]
})
export class DashboardModule { }
