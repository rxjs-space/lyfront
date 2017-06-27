import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyIdleComponent } from './survey-idle.component';

describe('SurveyIdleComponent', () => {
  let component: SurveyIdleComponent;
  let fixture: ComponentFixture<SurveyIdleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyIdleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyIdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
