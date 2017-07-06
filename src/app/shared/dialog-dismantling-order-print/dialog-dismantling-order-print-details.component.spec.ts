import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDismantlingOrderPrintDetailsComponent } from './dialog-dismantling-order-print-details.component';

describe('DialogDismantlingOrderPrintDetailsComponent', () => {
  let component: DialogDismantlingOrderPrintDetailsComponent;
  let fixture: ComponentFixture<DialogDismantlingOrderPrintDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDismantlingOrderPrintDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDismantlingOrderPrintDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
