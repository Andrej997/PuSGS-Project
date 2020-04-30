import { Flight } from '../flight/flight';
import { AvioSediste } from '../avio-sediste/avio-sediste';

export class FlightReservation {
    flight: Flight;
    reservedSeats: Array<AvioSediste>;
    // rent a car
    friends: Array<string>;
    prise: number;

    constructor(flight: Flight, reservedSeats: Array<AvioSediste>, friends: Array<string>, prise: number) {
        this.flight = flight;
        this.reservedSeats = reservedSeats;
        this.friends = friends;
        this.prise = prise;
    }
}
