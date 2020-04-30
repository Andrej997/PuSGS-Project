import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFlightReservationComponent } from './fast-flight-reservation.component';

describe('FastFlightReservationComponent', () => {
  let component: FastFlightReservationComponent;
  let fixture: ComponentFixture<FastFlightReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastFlightReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastFlightReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
