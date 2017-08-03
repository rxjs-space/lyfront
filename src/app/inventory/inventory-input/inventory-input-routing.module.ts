import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { InventoryInputHomeComponent } from './inventory-input-home/inventory-input-home.component';

const routes: Routes = [{
  path: '', canActivate: [AuthGuard], component: InventoryInputHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryInputRoutingModule { }



