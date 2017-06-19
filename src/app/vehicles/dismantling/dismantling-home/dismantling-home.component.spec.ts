import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismantlingHomeComponent } from './dismantling-home.component';

describe('DismantlingHomeComponent', () => {
  let component: DismantlingHomeComponent;
  let fixture: ComponentFixture<DismantlingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismantlingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismantlingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
