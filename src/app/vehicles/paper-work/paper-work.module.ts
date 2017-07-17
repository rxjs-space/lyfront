import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { PaperWorkRoutingModule } from './paper-work-routing.module';
import { PaperWorkHomeComponent } from './paper-work-home/paper-work-home.component';
import { PaperWorkMofcomComponent } from './paper-work-mofcom/paper-work-mofcom.component';

@NgModule({
  imports: [
    SharedModule,
    PaperWorkRoutingModule
  ],
  declarations: [PaperWorkHomeComponent, PaperWorkMofcomComponent]
})
export class PaperWorkModule { }
