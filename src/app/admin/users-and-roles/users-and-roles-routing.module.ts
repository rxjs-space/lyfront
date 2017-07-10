import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersAndRolesHomeComponent } from './users-and-roles-home/users-and-roles-home.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [{
  path: '', canLoad: [AuthGuard], component: UsersAndRolesHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersAndRolesRoutingModule { }
