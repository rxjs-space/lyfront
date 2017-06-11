import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminTypesComponent } from './admin-types/admin-types.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: AdminHomeComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'types'},
    {path: 'types', component: AdminTypesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
