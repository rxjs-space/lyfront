import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVehiclesCurrentStatesComponent } from './dashboard-vehicles-current-states.component';

describe('DashboardVehiclesCurrentStatesComponent', () => {
  let component: DashboardVehiclesCurrentStatesComponent;
  let fixture: ComponentFixture<DashboardVehiclesCurrentStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVehiclesCurrentStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVehiclesCurrentStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
