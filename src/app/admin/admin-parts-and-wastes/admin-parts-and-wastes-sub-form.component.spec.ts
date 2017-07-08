import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartsAndWastesSubFormComponent } from './admin-parts-and-wastes-sub-form.component';

describe('AdminPartsAndWastesSubFormComponent', () => {
  let component: AdminPartsAndWastesSubFormComponent;
  let fixture: ComponentFixture<AdminPartsAndWastesSubFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPartsAndWastesSubFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPartsAndWastesSubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
