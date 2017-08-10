import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { Survey2RoutingModule } from './survey2-routing.module';
import { Survey2HomeComponent } from './survey2-home/survey2-home.component';
import { Survey2ReadyComponent } from './survey2-ready/survey2-ready.component';
import { Survey2ReadyNcnmComponent } from './survey2-ready/survey2-ready-ncnm.component';
import { Survey2ReadyCommercialComponent } from './survey2-ready/survey2-ready-commercial.component';
import { Survey2ReadyNotReadyComponent } from './survey2-ready/survey2-ready-not-ready.component';
import { Survey2ReadySurveyNotNecessaryComponent } from './survey2-ready/survey2-ready-survey-not-necessary.component';
import { Survey2Ready2Component } from './survey2-ready2/survey2-ready2.component';
import { Survey2Ready2NotReadyComponent } from './survey2-ready2/survey2-ready2-not-ready.component';
import { Survey2Ready2ZeroSurveyComponent } from './survey2-ready2/survey2-ready2-zero-survey.component';
import { Survey2Ready2OneSurveyComponent } from './survey2-ready2/survey2-ready2-one-survey.component';
import { Survey2Ready2TwoSurveysComponent } from './survey2-ready2/survey2-ready2-two-surveys.component';

@NgModule({
  imports: [
    SharedModule,
    Survey2RoutingModule
  ],
  declarations: [Survey2HomeComponent, Survey2ReadyComponent, Survey2ReadyNcnmComponent, Survey2ReadyCommercialComponent, Survey2ReadyNotReadyComponent, Survey2ReadySurveyNotNecessaryComponent, Survey2Ready2Component, Survey2Ready2NotReadyComponent, Survey2Ready2ZeroSurveyComponent, Survey2Ready2OneSurveyComponent, Survey2Ready2TwoSurveysComponent]
})
export class Survey2Module { }
