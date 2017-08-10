import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2Ready2ZeroSurveyComponent } from './survey2-ready2-zero-survey.component';

describe('Survey2Ready2ZeroSurveyComponent', () => {
  let component: Survey2Ready2ZeroSurveyComponent;
  let fixture: ComponentFixture<Survey2Ready2ZeroSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2Ready2ZeroSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2Ready2ZeroSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
