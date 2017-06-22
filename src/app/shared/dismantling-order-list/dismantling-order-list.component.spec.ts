import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismantlingOrderListComponent } from './dismantling-order-list.component';

describe('DismantlingOrderListComponent', () => {
  let component: DismantlingOrderListComponent;
  let fixture: ComponentFixture<DismantlingOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismantlingOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismantlingOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
