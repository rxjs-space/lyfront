import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsNotesComponent } from './vehicle-details-notes.component';

describe('VehicleDetailsNotesComponent', () => {
  let component: VehicleDetailsNotesComponent;
  let fixture: ComponentFixture<VehicleDetailsNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
