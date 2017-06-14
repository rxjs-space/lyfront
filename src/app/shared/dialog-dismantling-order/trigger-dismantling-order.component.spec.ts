import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerDismantlingOrderComponent } from './trigger-dismantling-order.component';

describe('TriggerDismantlingOrderComponent', () => {
  let component: TriggerDismantlingOrderComponent;
  let fixture: ComponentFixture<TriggerDismantlingOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerDismantlingOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerDismantlingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
