import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsStatusComponent } from './vehicle-details-status.component';

describe('VehicleDetailsStatusComponent', () => {
  let component: VehicleDetailsStatusComponent;
  let fixture: ComponentFixture<VehicleDetailsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
