import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Survey2RoutingModule } from './survey2-routing.module';
import { Survey2HomeComponent } from './survey2-home/survey2-home.component';

@NgModule({
  imports: [
    CommonModule,
    Survey2RoutingModule
  ],
  declarations: [Survey2HomeComponent]
})
export class Survey2Module { }
