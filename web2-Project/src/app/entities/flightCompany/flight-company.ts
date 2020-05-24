import { Address } from '../address/address';
import { Flight } from '../flight/flight'
import { AvioSediste } from '../avio-sediste/avio-sediste'
import { FlightDestination } from '../flight-destination/flight-destination';
import { User } from '../user/user';

export class FlightCompany {
    id: number; // jedinstevi identifikacioni broj kompanije
    name: string;
    addressId: number;
    address: Address; // adresa gde se aerodrom nalazi
    promotionalDesc: string; // promotivni opis
    destinations: Array<FlightDestination>; // adrese na koje lete avioni kompanije
    flights: Array<Flight>; // svi trenutni letovi kompanije
    logo: string;
    ocene: Array<number>;

    adminId: string;
    admin: User;

    deleted: boolean;

    constructor(
        id: number,
        name: string, 
        address: Address, 
        promotionalDesc: string,
        destinations: Array<FlightDestination>,
        flights: Array<Flight>,
        logo: string,
        ocene: Array<number>) {
            this.id = id;
            this.name = name;
            this.address = address;
            this.promotionalDesc = promotionalDesc;
            this.destinations = destinations;
            this.flights = flights;
            this.logo = logo;
            this.ocene = ocene;

            this.deleted = false;
    }
}
