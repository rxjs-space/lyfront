import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2Ready2OneSurveyComponent } from './survey2-ready2-one-survey.component';

describe('Survey2Ready2OneSurveyComponent', () => {
  let component: Survey2Ready2OneSurveyComponent;
  let fixture: ComponentFixture<Survey2Ready2OneSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2Ready2OneSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2Ready2OneSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
