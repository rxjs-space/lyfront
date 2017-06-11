import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPartComponent } from './dialog-part.component';

describe('DialogPartComponent', () => {
  let component: DialogPartComponent;
  let fixture: ComponentFixture<DialogPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
