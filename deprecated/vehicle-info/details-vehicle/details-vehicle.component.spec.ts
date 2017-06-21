import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVehicleComponent } from './details-vehicle.component';

describe('DetailsVehicleComponent', () => {
  let component: DetailsVehicleComponent;
  let fixture: ComponentFixture<DetailsVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
