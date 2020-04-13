import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  numberOfSeats: number;
  symbol: string; // ako je +, znaci da se povecava

  constructor() { }

  setSeatsNumber(sn: number, sy: string) {
    this.numberOfSeats = sn;
    this.symbol = sy;
  }

  getSeatsNumber(): [number, string] {
    return [this.numberOfSeats, this.symbol];
  }

}
