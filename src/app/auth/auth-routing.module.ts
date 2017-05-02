import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShowLoginGuard } from './show-login.guard';


const routes: Routes = [
  { path: 'login',  component: LoginComponent, canActivate: [ShowLoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
