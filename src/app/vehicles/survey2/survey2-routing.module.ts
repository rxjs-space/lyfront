import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { Survey2HomeComponent } from './survey2-home/survey2-home.component';

const routes: Routes = [{
  path: '', canActivate: [AuthGuard], component: Survey2HomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Survey2RoutingModule { }

