import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcFlightComponent } from './cc-flight.component';

describe('CcFlightComponent', () => {
  let component: CcFlightComponent;
  let fixture: ComponentFixture<CcFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
