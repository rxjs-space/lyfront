import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMofcomLoginComponent } from './dialog-mofcom-login.component';

describe('DialogMofcomLoginComponent', () => {
  let component: DialogMofcomLoginComponent;
  let fixture: ComponentFixture<DialogMofcomLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMofcomLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMofcomLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
