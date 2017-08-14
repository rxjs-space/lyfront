import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVehiclesCurrentStatesVehiclesCountByDismantlingComponent } from './dashboard-vehicles-current-states-vehicles-count-by-dismantling.component';

describe('DashboardVehiclesCurrentStatesVehiclesCountByDismantlingComponent', () => {
  let component: DashboardVehiclesCurrentStatesVehiclesCountByDismantlingComponent;
  let fixture: ComponentFixture<DashboardVehiclesCurrentStatesVehiclesCountByDismantlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVehiclesCurrentStatesVehiclesCountByDismantlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVehiclesCurrentStatesVehiclesCountByDismantlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
