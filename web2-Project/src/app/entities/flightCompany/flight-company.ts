import { Address } from '../address/address';
import { Flight } from '../flight/flight'
import { Cak } from '../cena-avio-karte/cak'
import { AvioSediste } from '../avio-sediste/avio-sediste'
import { FlightDestination } from '../flight-destination/flight-destination';

export class FlightCompany {
    id: number; // jedinstevi identifikacioni broj kompanije
    name: string;
    address: Address; // adresa gde se aerodrom nalazi
    promotionalDesc: string; // promotivni opis
    destinations: Array<FlightDestination>; // adrese na koje lete avioni kompanije
    flights: Array<Flight>; // svi trenutni letovi kompanije
    fastReservations: Array<Flight>; // spisak karata sa poustima za brzu rezervaciju letova
    sedista: Array<AvioSediste>; // konfiguracija segmentana i mesta u avionu
    cenovnik: Array<Cak>; // za ovaj recnik, kljuc je naziv grada a vrednost je cena
    prtljagInfo: string;
    logo: string;
    ocene: Array<number>;

    constructor(
        id: number,
        name: string, 
        address: Address, 
        promotionalDesc: string,
        destinations: Array<FlightDestination>,
        flights: Array<Flight>,
        fastReservations: Array<Flight>,
        sedista: Array<AvioSediste>,
        cenovnik: Array<Cak>,
        prtljagInfo: string, 
        logo: string,
        ocene: Array<number>) {
            this.id = id;
            this.name = name;
            this.address = address;
            this.promotionalDesc = promotionalDesc;
            this.destinations = destinations;
            this.flights = flights;
            this.fastReservations = fastReservations;
            this.sedista = sedista;
            this.cenovnik = cenovnik;
            this.prtljagInfo = prtljagInfo;
            this.logo = logo;
            this.ocene = ocene;
    }
}
