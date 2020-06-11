import { FriendForFlight } from '../friend-for-flight/friend-for-flight';

export class FlightReservation {
    id: number;
    flightId: number;
    price: number;
    seatNumeration: number;
    seatId: number;
    UserIdForPOST: string;
    userBonus: boolean;
    ocenaLeta: number;
    ocenaKompanije: number;
    dateNow: Date;

    friendForFlights: Array<FriendForFlight>;

    // datum sletanja za rent a car! salji string 1:1:2002T11:54

    constructor(){
        this.friendForFlights = new Array<FriendForFlight>();
    }
}
