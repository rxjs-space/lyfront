import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVehiclesDailyClearComponent } from './dashboard-vehicles-daily-clear.component';

describe('DashboardVehiclesDailyClearComponent', () => {
  let component: DashboardVehiclesDailyClearComponent;
  let fixture: ComponentFixture<DashboardVehiclesDailyClearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVehiclesDailyClearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVehiclesDailyClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
