import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperWorkHomeComponent } from './paper-work-home.component';

describe('PaperWorkHomeComponent', () => {
  let component: PaperWorkHomeComponent;
  let fixture: ComponentFixture<PaperWorkHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperWorkHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperWorkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
