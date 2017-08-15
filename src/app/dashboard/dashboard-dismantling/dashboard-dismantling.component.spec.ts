import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDismantlingComponent } from './dashboard-dismantling.component';

describe('DashboardDismantlingComponent', () => {
  let component: DashboardDismantlingComponent;
  let fixture: ComponentFixture<DashboardDismantlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDismantlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDismantlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
