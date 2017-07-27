import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismantlingOrderDetailsComponent } from './dismantling-order-details.component';

describe('DismantlingOrderDetailsComponent', () => {
  let component: DismantlingOrderDetailsComponent;
  let fixture: ComponentFixture<DismantlingOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismantlingOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismantlingOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
