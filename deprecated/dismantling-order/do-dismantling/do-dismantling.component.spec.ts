import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoDismantlingComponent } from './do-dismantling.component';

describe('DoDismantlingComponent', () => {
  let component: DoDismantlingComponent;
  let fixture: ComponentFixture<DoDismantlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoDismantlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoDismantlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
