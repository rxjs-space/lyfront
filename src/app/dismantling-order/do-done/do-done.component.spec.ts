import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoDoneComponent } from './do-done.component';

describe('DoDoneComponent', () => {
  let component: DoDoneComponent;
  let fixture: ComponentFixture<DoDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
