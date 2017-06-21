import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoWaitingComponent } from './do-waiting.component';

describe('DoWaitingComponent', () => {
  let component: DoWaitingComponent;
  let fixture: ComponentFixture<DoWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
