import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioCompaniesComponent } from './avio-companies.component';

describe('AvioCompaniesComponent', () => {
  let component: AvioCompaniesComponent;
  let fixture: ComponentFixture<AvioCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvioCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
