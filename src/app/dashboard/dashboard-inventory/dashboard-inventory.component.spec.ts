import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInventoryComponent } from './dashboard-inventory.component';

describe('DashboardInventoryComponent', () => {
  let component: DashboardInventoryComponent;
  let fixture: ComponentFixture<DashboardInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
