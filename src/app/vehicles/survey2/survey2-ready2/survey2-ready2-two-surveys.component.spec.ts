import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2Ready2TwoSurveysComponent } from './survey2-ready2-two-surveys.component';

describe('Survey2Ready2TwoSurveysComponent', () => {
  let component: Survey2Ready2TwoSurveysComponent;
  let fixture: ComponentFixture<Survey2Ready2TwoSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2Ready2TwoSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2Ready2TwoSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
