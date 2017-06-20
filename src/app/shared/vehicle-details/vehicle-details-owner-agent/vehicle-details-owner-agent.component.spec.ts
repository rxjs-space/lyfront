import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsOwnerAgentComponent } from './vehicle-details-owner-agent.component';

describe('VehicleDetailsOwnerAgentComponent', () => {
  let component: VehicleDetailsOwnerAgentComponent;
  let fixture: ComponentFixture<VehicleDetailsOwnerAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsOwnerAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsOwnerAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
