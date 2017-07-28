import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismantlingPreDismantlingComponent } from './dismantling-pre-dismantling.component';

describe('DismantlingPreDismantlingComponent', () => {
  let component: DismantlingPreDismantlingComponent;
  let fixture: ComponentFixture<DismantlingPreDismantlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismantlingPreDismantlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismantlingPreDismantlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
