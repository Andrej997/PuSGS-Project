import { Presedanje } from '../flight-presedanje/presedanje';
import { Aeroplane } from '../aeroplane/aeroplane';
import { AvioLuggage } from '../avio-luggage/avio-luggage';
import { FlightReservation } from '../flight-reservation/flight-reservation';
import { Address } from '../address/address';

export class Flight {
    id: number;
    company: string;
    idCompany: number;
    logo: string;
    from: Address; //
    to: Address; //
    destImg: string; //
    datumPolaska: Date; //
    datumSletanja: Date;//
    prise: number; //
    priceTwoWay: number; //* cena povratne karte
    vremePutovanja: string;
    duzinaPutovanja: number;
    presedanje: Presedanje;
    aeroplane: Aeroplane;
    luggage: AvioLuggage;
    
    // polja koja ne prosledjujem kroz konstruktor, jer nisu obavezna za let
    numOfFastReseravtions: number; // broj sedista koja moze da ima za brzu rezervaciju
    discountForFastReservation: number; // popust za brzu rezervaciju
    ocene: Array<number>;

    //allReservations: Array<FlightReservation>;
    
    constructor(id: number, company: string, idCompany: number, logo: string, from: Address, to: Address, destImg: string,
                datumPolaska: Date, datumSletanja: Date, prise: number, priceTwoWay: number,
                vremePutovanja: string, duzinaPutovanja: number, presedanje: Presedanje, aeroplane: Aeroplane,
                luggage: AvioLuggage) {
        this.id = id;
        this.company = company;
        this.idCompany = idCompany;
        this.logo = logo;
        this.from = from;
        this.to = to;
        this.destImg = destImg;
        this.datumPolaska = datumPolaska;
        this.datumSletanja = datumSletanja;
        this.prise = prise;
        this.priceTwoWay = priceTwoWay;
        this.vremePutovanja = vremePutovanja;
        this.duzinaPutovanja = duzinaPutovanja;
        this.presedanje = presedanje;
        this.aeroplane = aeroplane;
        this.ocene = new Array<number>();
        this.luggage = luggage;
        //this.allReservations = new Array<FlightReservation>();
    }
}
