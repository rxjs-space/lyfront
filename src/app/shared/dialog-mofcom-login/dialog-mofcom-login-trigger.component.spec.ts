import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMofcomLoginTriggerComponent } from './dialog-mofcom-login-trigger.component';

describe('DialogMofcomLoginTriggerComponent', () => {
  let component: DialogMofcomLoginTriggerComponent;
  let fixture: ComponentFixture<DialogMofcomLoginTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMofcomLoginTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMofcomLoginTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
