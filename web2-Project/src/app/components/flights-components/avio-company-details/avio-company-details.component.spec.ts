import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioCompanyDetailsComponent } from './avio-company-details.component';

describe('AvioCompanyDetailsComponent', () => {
  let component: AvioCompanyDetailsComponent;
  let fixture: ComponentFixture<AvioCompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvioCompanyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
