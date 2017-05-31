import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemarkComponent } from './dialog-remark.component';

describe('DialogRemarkComponent', () => {
  let component: DialogRemarkComponent;
  let fixture: ComponentFixture<DialogRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
