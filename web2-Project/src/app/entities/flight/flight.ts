import { Presedanje } from '../flight-presedanje/presedanje';
import { Aeroplane } from '../aeroplane/aeroplane';

export class Flight {
    id: number;
    company: string;
    idCompany: number;
    logo: string;
    from: string; //
    to: string; //
    destImg: string; //
    datumPolaska: Date; //
    datumSletanja: Date;//
    prise: number; //
    vremePutovanja: string;
    duzinaPutovanja: number;
    presedanje: Presedanje;
    aeroplane: Aeroplane;
    
    constructor(id: number, company: string, idCompany: number, logo: string, from: string, to: string, destImg: string,
                datumPolaska: Date, datumSletanja: Date, prise: number,
                vremePutovanja: string, duzinaPutovanja: number, presedanje: Presedanje, aeroplane: Aeroplane) {
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
        this.vremePutovanja = vremePutovanja;
        this.duzinaPutovanja = duzinaPutovanja;
        this.presedanje = presedanje;
        this.aeroplane = aeroplane;
    }
}
