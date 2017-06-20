import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsDocsProvidedComponent } from './vehicle-details-docs-provided.component';

describe('VehicleDetailsDocsProvidedComponent', () => {
  let component: VehicleDetailsDocsProvidedComponent;
  let fixture: ComponentFixture<VehicleDetailsDocsProvidedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsDocsProvidedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsDocsProvidedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
