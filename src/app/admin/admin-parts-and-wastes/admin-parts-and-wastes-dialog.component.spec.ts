import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartsAndWastesDialogComponent } from './admin-parts-and-wastes-dialog.component';

describe('AdminPartsAndWastesDialogComponent', () => {
  let component: AdminPartsAndWastesDialogComponent;
  let fixture: ComponentFixture<AdminPartsAndWastesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPartsAndWastesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPartsAndWastesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
