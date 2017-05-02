import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DismantlingPlanRoutingModule } from './dismantling-plan-routing.module';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  imports: [
    CommonModule,
    DismantlingPlanRoutingModule
  ],
  declarations: [ListComponent, NewComponent, ShowComponent]
})
export class DismantlingPlanModule { }
