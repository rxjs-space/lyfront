import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { DismantlingRoutingModule } from './dismantling-routing.module';
import { DismantlingHomeComponent } from './dismantling-home/dismantling-home.component';
import { DismantlingIdleComponent } from './dismantling-idle/dismantling-idle.component';
import { DismantlingProgressingComponent } from './dismantling-progressing/dismantling-progressing.component';

@NgModule({
  imports: [
    SharedModule,
    DismantlingRoutingModule
  ],
  declarations: [DismantlingHomeComponent, DismantlingIdleComponent, DismantlingProgressingComponent]
})
export class DismantlingModule { }
