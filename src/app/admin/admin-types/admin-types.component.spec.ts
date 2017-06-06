import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypesComponent } from './admin-types.component';

describe('AdminTypesComponent', () => {
  let component: AdminTypesComponent;
  let fixture: ComponentFixture<AdminTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
