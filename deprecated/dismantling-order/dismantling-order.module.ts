import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DismantlingOrderRoutingModule } from './dismantling-order-routing.module';
import { DoHomeComponent } from './do-home/do-home.component';
import { DoWaitingComponent } from './do-waiting/do-waiting.component';
import { DoDoneComponent } from './do-done/do-done.component';
import { DoDismantlingComponent } from './do-dismantling/do-dismantling.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DismantlingOrderRoutingModule
  ],
  declarations: [DoHomeComponent, DoWaitingComponent, DoDoneComponent, DoDismantlingComponent]
})
export class DismantlingOrderModule { }
