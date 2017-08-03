import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryInputHomeComponent } from './inventory-input-home.component';

describe('InventoryInputHomeComponent', () => {
  let component: InventoryInputHomeComponent;
  let fixture: ComponentFixture<InventoryInputHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryInputHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryInputHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
