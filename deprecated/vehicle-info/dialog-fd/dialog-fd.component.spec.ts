import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFdComponent } from './dialog-fd.component';

describe('DialogFdComponent', () => {
  let component: DialogFdComponent;
  let fixture: ComponentFixture<DialogFdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
