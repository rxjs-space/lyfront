import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { DismantlingRoutingModule } from './dismantling-routing.module';
import { DismantlingHomeComponent } from './dismantling-home/dismantling-home.component';
// import { DismantlingIdleComponent } from './dismantling-idle/dismantling-idle.component';
import { DismantlingProgressingComponent } from './dismantling-progressing/dismantling-progressing.component';
import { DismantlingCompletedComponent } from './dismantling-completed/dismantling-completed.component';
import { DismantlingIdle2Component } from './dismantling-idle2/dismantling-idle2.component';
import { DismantlingPreDismantlingComponent } from './dismantling-pre-dismantling/dismantling-pre-dismantling.component';

@NgModule({
  imports: [
    SharedModule,
    DismantlingRoutingModule
  ],
  declarations: [DismantlingHomeComponent, /* DismantlingIdleComponent, */ DismantlingProgressingComponent, DismantlingCompletedComponent, DismantlingIdle2Component, DismantlingPreDismantlingComponent]
})
export class DismantlingModule { }
