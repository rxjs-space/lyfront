import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewFdComponent } from './dialog-new-fd.component';

describe('DialogNewFdComponent', () => {
  let component: DialogNewFdComponent;
  let fixture: ComponentFixture<DialogNewFdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewFdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewFdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
