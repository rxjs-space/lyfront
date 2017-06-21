import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOwnerAgentComponent } from './details-owner-agent.component';

describe('DetailsOwnerAgentComponent', () => {
  let component: DetailsOwnerAgentComponent;
  let fixture: ComponentFixture<DetailsOwnerAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOwnerAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOwnerAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
