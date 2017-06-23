import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismantlingCompletedComponent } from './dismantling-completed.component';

describe('DismantlingCompletedComponent', () => {
  let component: DismantlingCompletedComponent;
  let fixture: ComponentFixture<DismantlingCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismantlingCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismantlingCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
