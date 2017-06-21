import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { DoHomeComponent } from './do-home/do-home.component';


const routes: Routes = [
  {path: '', canActivate: [AuthGuard], children: [
    {path: '', pathMatch: 'full', component: DoHomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DismantlingOrderRoutingModule { }
