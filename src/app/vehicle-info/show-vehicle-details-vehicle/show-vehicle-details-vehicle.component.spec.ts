import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVehicleDetailsVehicleComponent } from './show-vehicle-details-vehicle.component';

describe('ShowVehicleDetailsVehicleComponent', () => {
  let component: ShowVehicleDetailsVehicleComponent;
  let fixture: ComponentFixture<ShowVehicleDetailsVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVehicleDetailsVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVehicleDetailsVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
