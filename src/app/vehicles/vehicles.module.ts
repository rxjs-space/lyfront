import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesHomeComponent } from './vehicles-home/vehicles-home.component';

@NgModule({
  imports: [
    SharedModule,
    VehiclesRoutingModule
  ],
  declarations: [VehiclesHomeComponent]
})
export class VehiclesModule { }
