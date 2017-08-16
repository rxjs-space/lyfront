import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardVehiclesComponent } from './dashboard-vehicles/dashboard-vehicles.component';
import { DashboardInventoryComponent } from './dashboard-inventory/dashboard-inventory.component';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { DashboardVehiclesDailyClearComponent } from './dashboard-vehicles/dashboard-vehicles-daily-clear/dashboard-vehicles-daily-clear.component';
import { DashboardVehiclesDailyClearEntranceComponent } from './dashboard-vehicles/dashboard-vehicles-daily-clear/dashboard-vehicles-daily-clear-entrance/dashboard-vehicles-daily-clear-entrance.component';
// import { DashboardVehiclesDailyClearDismantlingComponent } from './dashboard-vehicles/dashboard-vehicles-daily-clear/dashboard-vehicles-daily-clear-dismantling/dashboard-vehicles-daily-clear-dismantling.component';
import { DashboardDismantlingComponent } from './dashboard-dismantling/dashboard-dismantling.component';
import { DashboardDismantlingDailyClearComponent } from './dashboard-dismantling/dashboard-dismantling-daily-clear/dashboard-dismantling-daily-clear.component';
import { DashboardDismantlingCurrentStateComponent } from './dashboard-dismantling/dashboard-dismantling-current-state/dashboard-dismantling-current-state.component';
import { DashboardVehiclesCurrentStateComponent } from './dashboard-vehicles/dashboard-vehicles-current-state/dashboard-vehicles-current-state.component';

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
    DashboardVehiclesDailyClearEntranceComponent,
    // DashboardVehiclesDailyClearDismantlingComponent,
    DashboardDismantlingComponent,
    DashboardDismantlingDailyClearComponent,
    DashboardDismantlingCurrentStateComponent,
    DashboardVehiclesCurrentStateComponent
  ]
})
export class DashboardModule { }
