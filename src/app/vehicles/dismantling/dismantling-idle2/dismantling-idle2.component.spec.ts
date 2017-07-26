import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismantlingIdle2Component } from './dismantling-idle2.component';

describe('DismantlingIdle2Component', () => {
  let component: DismantlingIdle2Component;
  let fixture: ComponentFixture<DismantlingIdle2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismantlingIdle2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismantlingIdle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
