import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComboComponent } from './autocomplete-combo.component';

describe('AutocompleteComboComponent', () => {
  let component: AutocompleteComboComponent;
  let fixture: ComponentFixture<AutocompleteComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
