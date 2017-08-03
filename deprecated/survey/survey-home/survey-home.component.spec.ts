import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyHomeComponent } from './survey-home.component';

describe('SurveyHomeComponent', () => {
  let component: SurveyHomeComponent;
  let fixture: ComponentFixture<SurveyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
