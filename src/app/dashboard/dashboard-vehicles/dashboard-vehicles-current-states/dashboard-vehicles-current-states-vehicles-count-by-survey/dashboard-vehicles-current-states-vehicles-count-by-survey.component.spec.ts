import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVehiclesCurrentStatesVehiclesCountBySurveyComponent } from './dashboard-vehicles-current-states-vehicles-count-by-survey.component';

describe('DashboardVehiclesCurrentStatesVehiclesCountBySurveyComponent', () => {
  let component: DashboardVehiclesCurrentStatesVehiclesCountBySurveyComponent;
  let fixture: ComponentFixture<DashboardVehiclesCurrentStatesVehiclesCountBySurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVehiclesCurrentStatesVehiclesCountBySurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVehiclesCurrentStatesVehiclesCountBySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
