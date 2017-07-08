import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypesShowComponent } from './admin-types-show.component';

describe('AdminTypesShowComponent', () => {
  let component: AdminTypesShowComponent;
  let fixture: ComponentFixture<AdminTypesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTypesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTypesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
