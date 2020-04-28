import { Injectable } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private flight: Flight;

  numberOfSeats: number;
  symbol: string; // ako je +, znaci da se povecava
  reservedSeats: Array<boolean>; // lista rezervisanih siceva

  constructor() { }

  setFlight(flight: Flight) {
    this.flight = flight;
  }

  getFlight(): Flight {
    return this.flight;
  }

  setSeatsNumber(sn: number, as: Array<boolean>) {
    this.numberOfSeats = sn;
    this.reservedSeats = as;
  }

  getSeatsNumber(): [number, Array<boolean>] {
    return [this.numberOfSeats, this.reservedSeats];
  }

}
