import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypesShowPartsComponent } from './admin-types-show-parts.component';

describe('AdminTypesShowPartsComponent', () => {
  let component: AdminTypesShowPartsComponent;
  let fixture: ComponentFixture<AdminTypesShowPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTypesShowPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTypesShowPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
