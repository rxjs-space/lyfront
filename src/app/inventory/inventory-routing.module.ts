import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';

const routes: Routes = [{
  path: '', canActivate: [AuthGuard], component: InventoryHomeComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'input'},
    {path: 'current', canLoad: [AuthGuard], loadChildren: 'app/inventory/inventory-current/inventory-current.module#InventoryCurrentModule'},
    {path: 'input', canLoad: [AuthGuard], loadChildren: 'app/inventory/inventory-input/inventory-input.module#InventoryInputModule'},
    {path: 'output', canLoad: [AuthGuard], loadChildren: 'app/inventory/inventory-output/inventory-output.module#InventoryOutputModule'},
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
