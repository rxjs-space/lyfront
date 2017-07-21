import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
// import { AdminTypesComponent } from './admin-types/admin-types.component';
import { AuthGuard } from '../auth/auth.guard';
import { AdminPartsAndWastesComponent } from './admin-parts-and-wastes/admin-parts-and-wastes.component';

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: AdminHomeComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'parts-and-wastes'},
    {path: 'parts-and-wastes', component: AdminPartsAndWastesComponent, data: {categories: ['parts', 'wastes']}},
    {path: 'users-and-roles', canLoad: [AuthGuard], loadChildren: './users-and-roles/users-and-roles.module#UsersAndRolesModule'},
    {path: 'other-types', component: AdminPartsAndWastesComponent, data: {categories: [
      'facilities', 'mofcomRegisterTypes', 'vehicleTypes', 'useCharacters'
      ]}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
