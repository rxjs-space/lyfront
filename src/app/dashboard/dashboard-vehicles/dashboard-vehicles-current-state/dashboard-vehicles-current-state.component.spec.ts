import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVehiclesCurrentStateComponent } from './dashboard-vehicles-current-state.component';

describe('DashboardVehiclesCurrentStateComponent', () => {
  let component: DashboardVehiclesCurrentStateComponent;
  let fixture: ComponentFixture<DashboardVehiclesCurrentStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVehiclesCurrentStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVehiclesCurrentStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
