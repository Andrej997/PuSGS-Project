import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionCitiesComponent } from './suggestion-cities.component';

describe('SuggestionCitiesComponent', () => {
  let component: SuggestionCitiesComponent;
  let fixture: ComponentFixture<SuggestionCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
