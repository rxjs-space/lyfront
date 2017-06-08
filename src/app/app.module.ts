import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearnmdModule } from './learnmd/learnmd.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { VehicleInfoModule } from './vehicle-info/vehicle-info.module';
import { BACK_END_URL } from './app-config';
import { environment } from './../environments/environment';

/*
  dataServices including DataService and resolvers
*/
import { dataServices } from './data';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    LearnmdModule,
    AuthModule,
    DashboardModule,
    VehicleInfoModule
  ],
  providers: [
    ...dataServices,
    { provide: LOCALE_ID, useValue: 'zh-cn' },
    { provide: BACK_END_URL, useValue: environment.backendUrl }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
