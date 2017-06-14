import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingDismantlingOrdersComponent } from './existing-dismantling-orders.component';

describe('ExistingDismantlingOrdersComponent', () => {
  let component: ExistingDismantlingOrdersComponent;
  let fixture: ComponentFixture<ExistingDismantlingOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingDismantlingOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingDismantlingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
