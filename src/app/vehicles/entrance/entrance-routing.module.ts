import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

import { EntranceHomeComponent } from './entrance-home/entrance-home.component';


const routes: Routes = [{
  path: '', canActivate: [AuthGuard], component: EntranceHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntranceRoutingModule { }
