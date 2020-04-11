import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredCitiesComponent } from './filtered-cities.component';

describe('FilteredCitiesComponent', () => {
  let component: FilteredCitiesComponent;
  let fixture: ComponentFixture<FilteredCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
