import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DismantlingOrderRoutingModule } from './dismantling-order-routing.module';
import { DoHomeComponent } from './do-home/do-home.component';
import { DoWaitingComponent } from './do-waiting/do-waiting.component';
import { DoProgressingComponent } from './do-progressing/do-progressing.component';
import { DoDoneComponent } from './do-done/do-done.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DismantlingOrderRoutingModule
  ],
  declarations: [DoHomeComponent, DoWaitingComponent, DoProgressingComponent, DoDoneComponent]
})
export class DismantlingOrderModule { }
