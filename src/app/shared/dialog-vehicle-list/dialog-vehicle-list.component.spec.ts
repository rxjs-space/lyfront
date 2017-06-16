import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVehicleListComponent } from './dialog-vehicle-list.component';

describe('DialogVehicleListComponent', () => {
  let component: DialogVehicleListComponent;
  let fixture: ComponentFixture<DialogVehicleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVehicleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
