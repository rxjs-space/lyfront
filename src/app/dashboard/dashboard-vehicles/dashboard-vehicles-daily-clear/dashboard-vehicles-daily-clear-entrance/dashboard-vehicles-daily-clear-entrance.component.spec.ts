import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVehiclesDailyClearEntranceComponent } from './dashboard-vehicles-daily-clear-entrance.component';

describe('DashboardVehiclesDailyClearEntranceComponent', () => {
  let component: DashboardVehiclesDailyClearEntranceComponent;
  let fixture: ComponentFixture<DashboardVehiclesDailyClearEntranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVehiclesDailyClearEntranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVehiclesDailyClearEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
