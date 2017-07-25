import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2ReadySurveyNotNecessaryComponent } from './survey2-ready-survey-not-necessary.component';

describe('Survey2ReadySurveyNotNecessaryComponent', () => {
  let component: Survey2ReadySurveyNotNecessaryComponent;
  let fixture: ComponentFixture<Survey2ReadySurveyNotNecessaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2ReadySurveyNotNecessaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2ReadySurveyNotNecessaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
