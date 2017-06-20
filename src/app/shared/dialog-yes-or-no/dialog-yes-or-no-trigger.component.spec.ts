import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogYesOrNoTriggerComponent } from './dialog-yes-or-no-trigger.component';

describe('DialogYesOrNoTriggerComponent', () => {
  let component: DialogYesOrNoTriggerComponent;
  let fixture: ComponentFixture<DialogYesOrNoTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogYesOrNoTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogYesOrNoTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
