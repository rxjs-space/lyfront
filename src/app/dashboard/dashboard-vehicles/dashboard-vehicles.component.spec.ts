import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVehiclesComponent } from './dashboard-vehicles.component';

describe('DashboardVehiclesComponent', () => {
  let component: DashboardVehiclesComponent;
  let fixture: ComponentFixture<DashboardVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
