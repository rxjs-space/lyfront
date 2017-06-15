import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDismantlingOrderPrintComponent } from './dialog-dismantling-order-print.component';

describe('DialogDismantlingOrderPrintComponent', () => {
  let component: DialogDismantlingOrderPrintComponent;
  let fixture: ComponentFixture<DialogDismantlingOrderPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDismantlingOrderPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDismantlingOrderPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
