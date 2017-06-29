import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsPrintComponent } from './vehicle-details-print.component';

describe('VehicleDetailsPrintComponent', () => {
  let component: VehicleDetailsPrintComponent;
  let fixture: ComponentFixture<VehicleDetailsPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
