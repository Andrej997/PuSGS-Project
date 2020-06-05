import { Flight } from '../flight/flight';

export class FastFlightReservation {
    id: number;
    flight: Flight;
    price: number;
    seatNumeration: number;
    seatId: number;
    UserIdForPOST: string;

    constructor() {
    }
}
