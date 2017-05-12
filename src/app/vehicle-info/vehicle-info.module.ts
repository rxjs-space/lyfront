import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { VehicleInfoRoutingModule } from './vehicle-info-routing.module';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

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
    DetailsComponent
  ]
})
export class VehicleInfoModule { }
