import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsVehicleComponent } from './vehicle-details-vehicle.component';

describe('VehicleDetailsVehicleComponent', () => {
  let component: VehicleDetailsVehicleComponent;
  let fixture: ComponentFixture<VehicleDetailsVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
