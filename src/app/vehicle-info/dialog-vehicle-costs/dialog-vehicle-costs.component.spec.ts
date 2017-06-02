import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVehicleCostsComponent } from './dialog-vehicle-costs.component';

describe('DialogVehicleCostsComponent', () => {
  let component: DialogVehicleCostsComponent;
  let fixture: ComponentFixture<DialogVehicleCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVehicleCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVehicleCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
