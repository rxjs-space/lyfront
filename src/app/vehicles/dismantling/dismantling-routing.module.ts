import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

import { DismantlingHomeComponent } from './dismantling-home/dismantling-home.component';

const routes: Routes = [{
  path: '', canActivate: [AuthGuard], component: DismantlingHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DismantlingRoutingModule { }

