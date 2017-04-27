import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnmdComponent } from './learnmd/learnmd.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LearnmdComponent],
  exports: [LearnmdComponent]
})
export class LearnmdModule { }
