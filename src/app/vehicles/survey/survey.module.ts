import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyHomeComponent } from './survey-home/survey-home.component';

@NgModule({
  imports: [
    SharedModule,
    SurveyRoutingModule
  ],
  declarations: [SurveyHomeComponent]
})
export class SurveyModule { }
