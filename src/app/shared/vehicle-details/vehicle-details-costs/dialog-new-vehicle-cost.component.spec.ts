import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewVehicleCostComponent } from './dialog-new-vehicle-cost.component';

describe('DialogNewVehicleCostComponent', () => {
  let component: DialogNewVehicleCostComponent;
  let fixture: ComponentFixture<DialogNewVehicleCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewVehicleCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewVehicleCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
