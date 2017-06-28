import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaperWorkRoutingModule } from './paper-work-routing.module';
import { PaperWorkHomeComponent } from './paper-work-home/paper-work-home.component';

@NgModule({
  imports: [
    CommonModule,
    PaperWorkRoutingModule
  ],
  declarations: [PaperWorkHomeComponent]
})
export class PaperWorkModule { }
