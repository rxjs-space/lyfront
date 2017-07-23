import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';

@NgModule({
  imports: [
    SharedModule,
    InventoryRoutingModule
  ],
  declarations: [InventoryHomeComponent]
})
export class InventoryModule { }
