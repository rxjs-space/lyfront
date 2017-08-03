import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { SurveyHomeComponent } from './survey-home/survey-home.component';


const routes: Routes = [{
  path: '', canActivate: [AuthGuard], component: SurveyHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
