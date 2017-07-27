import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDismantlingOrder2Component } from './dialog-dismantling-order2.component';

describe('DialogDismantlingOrder2Component', () => {
  let component: DialogDismantlingOrder2Component;
  let fixture: ComponentFixture<DialogDismantlingOrder2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDismantlingOrder2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDismantlingOrder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
