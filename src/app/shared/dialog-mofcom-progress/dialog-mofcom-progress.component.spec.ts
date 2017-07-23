import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMofcomProgressComponent } from './dialog-mofcom-progress.component';

describe('DialogMofcomProgressComponent', () => {
  let component: DialogMofcomProgressComponent;
  let fixture: ComponentFixture<DialogMofcomProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMofcomProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMofcomProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
