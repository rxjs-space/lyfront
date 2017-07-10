import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogYesNo2Component } from './dialog-yes-no-2.component';

describe('DialogYesNo2Component', () => {
  let component: DialogYesNo2Component;
  let fixture: ComponentFixture<DialogYesNo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogYesNo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogYesNo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
