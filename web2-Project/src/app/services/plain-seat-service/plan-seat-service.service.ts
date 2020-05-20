import { Injectable } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';

@Injectable({
  providedIn: 'root'
})
export class PlanSeatServiceService {
  flight: Flight;

  constructor() { }

  setFlight(flight: Flight) {
    this.flight = flight;
  }

  getFlight(): Flight {
    if (this.flight != null)
      return this.flight;
  }
}
