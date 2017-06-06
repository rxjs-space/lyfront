import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminTypesComponent } from './admin-types/admin-types.component';

const routes: Routes = [
  {path: '', component: AdminHomeComponent, children: [
    {path: 'types', component: AdminTypesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
