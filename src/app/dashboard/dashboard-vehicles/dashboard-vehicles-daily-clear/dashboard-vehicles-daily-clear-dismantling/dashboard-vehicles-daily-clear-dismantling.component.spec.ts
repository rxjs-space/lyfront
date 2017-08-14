import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVehiclesDailyClearDismantlingComponent } from './dashboard-vehicles-daily-clear-dismantling.component';

describe('DashboardVehiclesDailyClearDismantlingComponent', () => {
  let component: DashboardVehiclesDailyClearDismantlingComponent;
  let fixture: ComponentFixture<DashboardVehiclesDailyClearDismantlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVehiclesDailyClearDismantlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVehiclesDailyClearDismantlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
