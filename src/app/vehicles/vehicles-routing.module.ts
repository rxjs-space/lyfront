import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { VehiclesHomeComponent } from './vehicles-home/vehicles-home.component';



const routes: Routes = [{
  path: '', canActivate: [AuthGuard], component: VehiclesHomeComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'entrance'},
    {path: 'entrance', canLoad: [AuthGuard], loadChildren: 'app/vehicles/entrance/entrance.module#EntranceModule'},
    {path: 'survey', canLoad: [AuthGuard], loadChildren: 'app/vehicles/survey/survey.module#SurveyModule'},
    {path: 'dismantling', canLoad: [AuthGuard], loadChildren: 'app/vehicles/dismantling/dismantling.module#DismantlingModule'},
    {path: 'paper-work', canLoad: [AuthGuard], loadChildren: 'app/vehicles/paper-work/paper-work.module#PaperWorkModule'},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
