import { Address } from '../address/address';
import { Flight } from '../flight/flight'
import { AvioSediste } from '../avio-sediste/avio-sediste'
import { FlightDestination } from '../flight-destination/flight-destination';

export class FlightCompany {
    id: number; // jedinstevi identifikacioni broj kompanije
    name: string;
    address: Address; // adresa gde se aerodrom nalazi
    promotionalDesc: string; // promotivni opis
    destinations: Array<FlightDestination>; // adrese na koje lete avioni kompanije
    flights: Array<Flight>; // svi trenutni letovi kompanije
    sedista: Array<AvioSediste>; // konfiguracija segmentana i mesta u avionu
    logo: string;
    ocene: Array<number>;

    constructor(
        id: number,
        name: string, 
        address: Address, 
        promotionalDesc: string,
        destinations: Array<FlightDestination>,
        flights: Array<Flight>,
        sedista: Array<AvioSediste>,
        logo: string,
        ocene: Array<number>) {
            this.id = id;
            this.name = name;
            this.address = address;
            this.promotionalDesc = promotionalDesc;
            this.destinations = destinations;
            this.flights = flights;
            this.sedista = sedista;
            this.logo = logo;
            this.ocene = ocene;
    }
}
