import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCompletedComponent } from './survey-completed.component';

describe('SurveyCompletedComponent', () => {
  let component: SurveyCompletedComponent;
  let fixture: ComponentFixture<SurveyCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
