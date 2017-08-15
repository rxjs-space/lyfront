import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsAndWastesListDialogComponent } from './parts-and-wastes-list-dialog.component';

describe('PartsAndWastesListDialogComponent', () => {
  let component: PartsAndWastesListDialogComponent;
  let fixture: ComponentFixture<PartsAndWastesListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsAndWastesListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsAndWastesListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
