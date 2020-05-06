import { Injectable } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { User } from 'src/app/entities/user/user';

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

  seatId: number;
  setSeatsNumber(sn: number, as: Array<boolean>, seatId: number) {
    this.numberOfSeats = sn;
    this.reservedSeats = as;
    this.seatId = seatId;
  }

  getSeatsNumber(): [number, Array<boolean>, number] {
    return [this.numberOfSeats, this.reservedSeats, this.seatId];
  }

  private allFriendsToCall: Array<User> = new Array<User>();
  setFriend(user: User, passport: string) {
    this.allFriendsToCall.push(user);
  }

  getCalledFriends(): Array<User> {
    return this.allFriendsToCall;
  }
}
