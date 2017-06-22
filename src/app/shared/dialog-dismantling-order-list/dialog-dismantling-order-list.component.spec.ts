import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDismantlingOrderListComponent } from './dialog-dismantling-order-list.component';

describe('DialogDismantlingOrderListComponent', () => {
  let component: DialogDismantlingOrderListComponent;
  let fixture: ComponentFixture<DialogDismantlingOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDismantlingOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDismantlingOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
