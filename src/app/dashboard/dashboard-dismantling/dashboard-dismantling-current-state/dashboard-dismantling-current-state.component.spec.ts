import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDismantlingCurrentStateComponent } from './dashboard-dismantling-current-state.component';

describe('DashboardDismantlingCurrentStateComponent', () => {
  let component: DashboardDismantlingCurrentStateComponent;
  let fixture: ComponentFixture<DashboardDismantlingCurrentStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDismantlingCurrentStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDismantlingCurrentStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
