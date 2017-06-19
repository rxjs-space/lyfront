import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsGeneralComponent } from './vehicle-details-general.component';

describe('VehicleDetailsGeneralComponent', () => {
  let component: VehicleDetailsGeneralComponent;
  let fixture: ComponentFixture<VehicleDetailsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
