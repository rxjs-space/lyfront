import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsCostsComponent } from './vehicle-details-costs.component';

describe('VehicleDetailsCostsComponent', () => {
  let component: VehicleDetailsCostsComponent;
  let fixture: ComponentFixture<VehicleDetailsCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
