import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListStatusComponent } from './vehicle-list-status.component';

describe('VehicleListStatusComponent', () => {
  let component: VehicleListStatusComponent;
  let fixture: ComponentFixture<VehicleListStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleListStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
