import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewVehicleNoteComponent } from './dialog-new-vehicle-note.component';

describe('DialogNewVehicleNoteComponent', () => {
  let component: DialogNewVehicleNoteComponent;
  let fixture: ComponentFixture<DialogNewVehicleNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewVehicleNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewVehicleNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
