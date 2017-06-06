import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminTypesComponent } from './admin-types/admin-types.component';
import { AdminTypesShowComponent } from './admin-types-show/admin-types-show.component';
import { AdminTypesShowPartsComponent } from './admin-types-show-parts/admin-types-show-parts.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [AdminHomeComponent, AdminTypesComponent, AdminTypesShowComponent, AdminTypesShowPartsComponent]
})
export class AdminModule { }
