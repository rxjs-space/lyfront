import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismantlingOrderDetails2Component } from './dismantling-order-details2.component';

describe('DismantlingOrderDetails2Component', () => {
  let component: DismantlingOrderDetails2Component;
  let fixture: ComponentFixture<DismantlingOrderDetails2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismantlingOrderDetails2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismantlingOrderDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
