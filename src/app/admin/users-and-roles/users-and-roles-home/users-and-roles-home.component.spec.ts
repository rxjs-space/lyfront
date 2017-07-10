import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndRolesHomeComponent } from './users-and-roles-home.component';

describe('UsersAndRolesHomeComponent', () => {
  let component: UsersAndRolesHomeComponent;
  let fixture: ComponentFixture<UsersAndRolesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAndRolesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAndRolesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
