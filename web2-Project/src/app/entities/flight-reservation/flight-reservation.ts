
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

    // datum sletanja za rent a car! salji string 1:1:2002T11:54

    constructor(){
    }
}
