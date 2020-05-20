
export class FlightReservation {
    flightId: number; //* id od leta
    avioCompanyId: number; //* id od kompanije koja organizuje taj let
    reservedSeatsIds: number; //* moje sediste
    // rent a car //* ovde treba neki podatak za rent-a-car service
    friends: Array<string>; //* prijatelji koji su pozvani
    totalPrice: number; //* ukupna cena

    // datum sletanja za rent a car! salji string 1:1:2002T11:54

    constructor(){
        this.friends = new Array<string>();
    }
}
