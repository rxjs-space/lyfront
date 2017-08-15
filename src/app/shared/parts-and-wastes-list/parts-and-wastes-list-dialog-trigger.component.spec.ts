import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsAndWastesListDialogTriggerComponent } from './parts-and-wastes-list-dialog-trigger.component';

describe('PartsAndWastesListDialogTriggerComponent', () => {
  let component: PartsAndWastesListDialogTriggerComponent;
  let fixture: ComponentFixture<PartsAndWastesListDialogTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsAndWastesListDialogTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsAndWastesListDialogTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
