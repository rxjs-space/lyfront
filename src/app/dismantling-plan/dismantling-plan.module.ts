import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DismantlingPlanRoutingModule } from './dismantling-plan-routing.module';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  imports: [
    SharedModule,
    DismantlingPlanRoutingModule
  ],
  declarations: [ListComponent, NewComponent, ShowComponent]
})
export class DismantlingPlanModule { }
