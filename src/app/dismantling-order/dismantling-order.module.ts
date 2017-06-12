import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DismantlingOrderRoutingModule } from './dismantling-order-routing.module';
import { DoHomeComponent } from './do-home/do-home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DismantlingOrderRoutingModule
  ],
  declarations: [DoHomeComponent]
})
export class DismantlingOrderModule { }
