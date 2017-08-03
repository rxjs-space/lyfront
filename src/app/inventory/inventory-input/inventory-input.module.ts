import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { InventoryInputRoutingModule } from './inventory-input-routing.module';
import { InventoryInputFromDismantlingComponent } from './inventory-input-from-dismantling/inventory-input-from-dismantling.component';
import { InventoryInputHomeComponent } from './inventory-input-home/inventory-input-home.component';
import { InventoryInputFromDismantlingInputReadyComponent } from './inventory-input-from-dismantling/inventory-input-from-dismantling-input-ready.component';
import { InventoryInputFromDismantlingInputDoneComponent } from './inventory-input-from-dismantling/inventory-input-from-dismantling-input-done.component';

@NgModule({
  imports: [
    SharedModule,
    InventoryInputRoutingModule
  ],
  declarations: [InventoryInputFromDismantlingComponent, InventoryInputHomeComponent, InventoryInputFromDismantlingInputReadyComponent, InventoryInputFromDismantlingInputDoneComponent]
})
export class InventoryInputModule { }
