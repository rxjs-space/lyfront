import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDismantlingOrderPrintTriggerComponent } from './dialog-dismantling-order-print-trigger.component';

describe('DialogDismantlingOrderPrintTriggerComponent', () => {
  let component: DialogDismantlingOrderPrintTriggerComponent;
  let fixture: ComponentFixture<DialogDismantlingOrderPrintTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDismantlingOrderPrintTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDismantlingOrderPrintTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
