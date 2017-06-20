import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsFeesAndDeductionsComponent } from './vehicle-details-fees-and-deductions.component';

describe('VehicleDetailsFeesAndDeductionsComponent', () => {
  let component: VehicleDetailsFeesAndDeductionsComponent;
  let fixture: ComponentFixture<VehicleDetailsFeesAndDeductionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsFeesAndDeductionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsFeesAndDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
