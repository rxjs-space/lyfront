import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSearchComponent } from './vehicle-search.component';

describe('VehicleSearchComponent', () => {
  let component: VehicleSearchComponent;
  let fixture: ComponentFixture<VehicleSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
