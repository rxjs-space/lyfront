import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperWorkMofcomCaptchaComponent } from './paper-work-mofcom-captcha.component';

describe('PaperWorkMofcomCaptchaComponent', () => {
  let component: PaperWorkMofcomCaptchaComponent;
  let fixture: ComponentFixture<PaperWorkMofcomCaptchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperWorkMofcomCaptchaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperWorkMofcomCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
