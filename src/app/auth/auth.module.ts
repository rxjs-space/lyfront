import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ShowLoginGuard } from './show-login.guard';
import { AuthService } from './auth.service';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [
    AuthService,
    AuthGuard,
    ShowLoginGuard
  ]
})
export class AuthModule { }
