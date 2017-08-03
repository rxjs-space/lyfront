import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyHomeComponent } from './survey-home/survey-home.component';
import { SurveyIdleComponent } from './survey-idle/survey-idle.component';
import { SurveyCompletedComponent } from './survey-completed/survey-completed.component';

@NgModule({
  imports: [
    SharedModule,
    SurveyRoutingModule
  ],
  declarations: [SurveyHomeComponent, SurveyIdleComponent, SurveyCompletedComponent]
})
export class SurveyModule { }
