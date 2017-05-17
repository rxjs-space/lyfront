import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVehicleDetailsComponent } from './new-vehicle-details.component';

describe('NewVehicleDetailsComponent', () => {
  let component: NewVehicleDetailsComponent;
  let fixture: ComponentFixture<NewVehicleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVehicleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
