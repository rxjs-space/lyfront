import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDismantlingDailyClearComponent } from './dashboard-dismantling-daily-clear.component';

describe('DashboardDismantlingDailyClearComponent', () => {
  let component: DashboardDismantlingDailyClearComponent;
  let fixture: ComponentFixture<DashboardDismantlingDailyClearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDismantlingDailyClearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDismantlingDailyClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
