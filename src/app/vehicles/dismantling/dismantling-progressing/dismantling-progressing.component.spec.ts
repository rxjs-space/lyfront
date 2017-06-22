import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismantlingProgressingComponent } from './dismantling-progressing.component';

describe('DismantlingProgressingComponent', () => {
  let component: DismantlingProgressingComponent;
  let fixture: ComponentFixture<DismantlingProgressingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismantlingProgressingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismantlingProgressingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
