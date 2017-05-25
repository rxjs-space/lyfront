import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { VehicleInfoRoutingModule } from './vehicle-info-routing.module';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { ShowVehicleDetailsComponent } from './show-vehicle-details/show-vehicle-details.component';
import { NewVehicleDetailsComponent } from './new-vehicle-details/new-vehicle-details.component';
import { DetailsVehicleComponent } from './details-vehicle/details-vehicle.component';

@NgModule({
  imports: [
    SharedModule,
    VehicleInfoRoutingModule
  ],
  declarations: [
    NewComponent,
    ShowComponent,
    ListComponent,
    HomeComponent,
    ShowVehicleDetailsComponent,
    NewVehicleDetailsComponent,
    DetailsVehicleComponent
  ]
})
export class VehicleInfoModule { }
