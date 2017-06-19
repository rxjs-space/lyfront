import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { DismantlingRoutingModule } from './dismantling-routing.module';
import { DismantlingHomeComponent } from './dismantling-home/dismantling-home.component';
import { DismantlingIdleComponent } from './dismantling-idle/dismantling-idle.component';

@NgModule({
  imports: [
    SharedModule,
    DismantlingRoutingModule
  ],
  declarations: [DismantlingHomeComponent, DismantlingIdleComponent]
})
export class DismantlingModule { }
