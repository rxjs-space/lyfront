import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoProgressingComponent } from './do-progressing.component';

describe('DoProgressingComponent', () => {
  let component: DoProgressingComponent;
  let fixture: ComponentFixture<DoProgressingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoProgressingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoProgressingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
