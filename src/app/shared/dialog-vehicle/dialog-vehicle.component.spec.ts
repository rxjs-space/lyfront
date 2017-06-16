import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVehicleComponent } from './dialog-vehicle.component';

describe('DialogVehicleComponent', () => {
  let component: DialogVehicleComponent;
  let fixture: ComponentFixture<DialogVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
