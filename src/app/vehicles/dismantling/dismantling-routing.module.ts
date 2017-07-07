import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

import { DismantlingHomeComponent } from './dismantling-home/dismantling-home.component';
import { DialogDismantlingOrderPrintComponent } from '../../shared/dialog-dismantling-order-print/dialog-dismantling-order-print.component';
const routes: Routes = [{
  path: '', canActivate: [AuthGuard], pathMatch: 'full', component: DismantlingHomeComponent,
}, {
  path: 'working-in-progress', component: DialogDismantlingOrderPrintComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DismantlingRoutingModule { }

