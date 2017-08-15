import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsAndWastesListComponent } from './parts-and-wastes-list.component';

describe('PartsAndWastesListComponent', () => {
  let component: PartsAndWastesListComponent;
  let fixture: ComponentFixture<PartsAndWastesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsAndWastesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsAndWastesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
