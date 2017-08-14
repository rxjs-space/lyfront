import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVehiclesCurrentStatesVehiclesCountByMofcomComponent } from './dashboard-vehicles-current-states-vehicles-count-by-mofcom.component';

describe('DashboardVehiclesCurrentStatesVehiclesCountByMofcomComponent', () => {
  let component: DashboardVehiclesCurrentStatesVehiclesCountByMofcomComponent;
  let fixture: ComponentFixture<DashboardVehiclesCurrentStatesVehiclesCountByMofcomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVehiclesCurrentStatesVehiclesCountByMofcomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVehiclesCurrentStatesVehiclesCountByMofcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
