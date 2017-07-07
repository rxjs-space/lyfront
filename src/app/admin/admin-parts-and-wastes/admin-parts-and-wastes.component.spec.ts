import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartsAndWastesComponent } from './admin-parts-and-wastes.component';

describe('AdminPartsAndWastesComponent', () => {
  let component: AdminPartsAndWastesComponent;
  let fixture: ComponentFixture<AdminPartsAndWastesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPartsAndWastesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPartsAndWastesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
