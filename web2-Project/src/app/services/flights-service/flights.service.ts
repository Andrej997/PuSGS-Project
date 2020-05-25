import { Injectable } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { User } from 'src/app/entities/user/user';
import { FlightReservation } from 'src/app/entities/flight-reservation/flight-reservation';

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

  //#region disable seat
  numberOfDisabledSeats: number;
  disableSeatId: number;
  disabledSeats: Array<boolean>;
  setDisabledSeatNumber(sn: number, as: Array<boolean>, seatId: number) {
    this.numberOfDisabledSeats = sn;
    this.disabledSeats = as;
    this.disableSeatId = seatId;
  }

  getDisabledSeatNumber(): [number, Array<boolean>, number] {
    return [this.numberOfDisabledSeats, this.disabledSeats, this.disableSeatId];
  }
  //#endregion

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
  setFriend(user: User) {
    let includes = false;
    for (let i = 0; i < this.allFriendsToCall.length; ++i) {
      if (this.allFriendsToCall[i].email === user.email && 
          this.allFriendsToCall[i].firstName === user.firstName &&
          this.allFriendsToCall[i].lastName === user.lastName) {
        includes = true;
        // console.log("sadrzi")
        break;
      }
    }
    if (includes === false)
      this.allFriendsToCall.push(user);
    //console.log(this.allFriendsToCall)
  }

  getCalledFriends(): Array<User> {
    return this.allFriendsToCall;
  }

  resetService() {
    this.numberOfSeats = 0;
    this.reservedSeats = new Array<boolean>();
    this.seatId = 0;
    this.allFriendsToCall = new Array<User>();
    this.seatBroj = 0;
  }

  seatBroj: number = 0;
  setSeatCount(br: number) {
    this.seatBroj = br;
  }
  getSeatBroj(): number {
    return this.seatBroj;
  }
  getAddedFriendToList(): number {
    return this.allFriendsToCall.length;
  }
}
