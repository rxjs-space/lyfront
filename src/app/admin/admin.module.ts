import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminTypesComponent } from './admin-types/admin-types.component';
import { AdminTypesShowComponent } from './admin-types-show/admin-types-show.component';
import { AdminTypesShowPartsComponent } from './admin-types-show-parts/admin-types-show-parts.component';
import { DialogPartComponent } from './dialog-part/dialog-part.component';
import { AdminPartsAndWastesComponent } from './admin-parts-and-wastes/admin-parts-and-wastes.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  entryComponents: [DialogPartComponent],
  declarations: [
    AdminHomeComponent,
    AdminTypesComponent,
    AdminTypesShowComponent,
    AdminTypesShowPartsComponent,
    DialogPartComponent,
    AdminPartsAndWastesComponent,]
})
export class AdminModule { }
