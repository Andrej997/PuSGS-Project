import { Flight } from '../flight/flight';
import { AvioSediste } from '../avio-sediste/avio-sediste';

export class FlightReservation {
    flightId: number; //* id od leta
    avioCompanyId: number; //* id od kompanije koja organizuje taj let
    reservedSeatsIds: number; //* moje sediste
    // rent a car //* ovde treba neki podatak za rent-a-car service
    friends: Array<string>; //* prijatelji koji su pozvani
    totalPrice: number; //* ukupna cena

    constructor(){}
}
