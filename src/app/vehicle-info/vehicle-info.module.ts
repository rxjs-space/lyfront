import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleInfoRoutingModule } from './vehicle-info-routing.module';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    VehicleInfoRoutingModule
  ],
  declarations: [NewComponent, ShowComponent, ListComponent]
})
export class VehicleInfoModule { }
