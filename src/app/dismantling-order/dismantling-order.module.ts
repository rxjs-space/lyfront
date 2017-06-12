import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DismantlingOrderRoutingModule } from './dismantling-order-routing.module';
import { DoHomeComponent } from './do-home/do-home.component';

@NgModule({
  imports: [
    CommonModule,
    DismantlingOrderRoutingModule
  ],
  declarations: [DoHomeComponent]
})
export class DismantlingOrderModule { }
