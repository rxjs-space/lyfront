import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVehicleCostsComponent } from './details-vehicle-costs.component';

describe('DetailsVehicleCostsComponent', () => {
  let component: DetailsVehicleCostsComponent;
  let fixture: ComponentFixture<DetailsVehicleCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVehicleCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVehicleCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
