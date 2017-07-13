import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperWorkMofcomComponent } from './paper-work-mofcom.component';

describe('PaperWorkMofcomComponent', () => {
  let component: PaperWorkMofcomComponent;
  let fixture: ComponentFixture<PaperWorkMofcomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperWorkMofcomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperWorkMofcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
