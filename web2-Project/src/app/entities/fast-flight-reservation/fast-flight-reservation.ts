import { Flight } from '../flight/flight';

export class FastFlightReservation {
    id: number;
    flightId: number;
    price: number;
    seatNumeration: number;
    seatId: number;
    UserIdForPOST: string;
    userBonus: boolean;

    constructor() {
    }
}
