import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDismantlingOrderComponent } from './dialog-dismantling-order.component';

describe('DialogDismantlingOrderComponent', () => {
  let component: DialogDismantlingOrderComponent;
  let fixture: ComponentFixture<DialogDismantlingOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDismantlingOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDismantlingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
