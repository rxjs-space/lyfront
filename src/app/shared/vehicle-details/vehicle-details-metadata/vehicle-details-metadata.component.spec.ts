import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsMetadataComponent } from './vehicle-details-metadata.component';

describe('VehicleDetailsMetadataComponent', () => {
  let component: VehicleDetailsMetadataComponent;
  let fixture: ComponentFixture<VehicleDetailsMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
