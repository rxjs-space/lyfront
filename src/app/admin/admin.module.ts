import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
// import { AdminTypesComponent } from './admin-types/admin-types.component';
// import { AdminTypesShowComponent } from './admin-types-show/admin-types-show.component';
// import { AdminTypesShowPartsComponent } from './admin-types-show-parts/admin-types-show-parts.component';
// import { DialogPartComponent } from './dialog-part/dialog-part.component';
import { AdminPartsAndWastesComponent } from './admin-parts-and-wastes/admin-parts-and-wastes.component';
import { AdminPartsAndWastesSubFormComponent } from './admin-parts-and-wastes/admin-parts-and-wastes-sub-form.component';
import { AdminPartsAndWastesDialogComponent } from './admin-parts-and-wastes/admin-parts-and-wastes-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  entryComponents: [/*DialogPartComponent, */AdminPartsAndWastesDialogComponent],
  declarations: [
    AdminHomeComponent,
    // AdminTypesComponent,
    // AdminTypesShowComponent,
    // AdminTypesShowPartsComponent,
    // DialogPartComponent,
    AdminPartsAndWastesComponent,
    AdminPartsAndWastesSubFormComponent,
    AdminPartsAndWastesDialogComponent,
  ],
})
export class AdminModule { }
