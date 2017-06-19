import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVehicleTriggerComponent } from './dialog-vehicle-trigger.component';

describe('DialogVehicleTriggerComponent', () => {
  let component: DialogVehicleTriggerComponent;
  let fixture: ComponentFixture<DialogVehicleTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVehicleTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVehicleTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
