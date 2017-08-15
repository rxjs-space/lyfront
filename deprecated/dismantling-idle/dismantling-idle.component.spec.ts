import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismantlingIdleComponent } from './dismantling-idle.component';

describe('DismantlingIdleComponent', () => {
  let component: DismantlingIdleComponent;
  let fixture: ComponentFixture<DismantlingIdleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismantlingIdleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismantlingIdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
