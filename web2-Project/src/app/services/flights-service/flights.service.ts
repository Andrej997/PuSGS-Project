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
    this.allFriendsToCall.push(user);
    //console.log(this.allFriendsToCall)
  }

  getCalledFriends(): Array<User> {
    return this.allFriendsToCall;
  }

  //* DOBIJEM LISTU SEDISTA, I NA OSNOVU TOGA JA PROMENIM U AVIONU TA SEDISTA
  addReservation(selectedSeats: Array<number>) {
    selectedSeats.forEach(element => {
      let index = element - 1;
      //console.log(index);
      if (this.flight.aeroplane.allSeats[index].reserved === false){
        this.flight.aeroplane.allSeats[index].reserved = true;
      }
    });
    //console.log(this.flight);
  } 
}
