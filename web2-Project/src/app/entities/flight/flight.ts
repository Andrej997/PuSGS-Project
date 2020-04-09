import { Presedanje } from '../flight-presedanje/presedanje';

export class Flight {
    id: number;
    company: string;
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
    
    constructor(id: number, company: string, logo: string, from: string, to: string, destImg: string,
                datumPolaska: Date, datumSletanja: Date, prise: number,
                vremePutovanja: string, duzinaPutovanja: number, presedanje: Presedanje) {
        this.id = id;
        this.company = company;
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
    }
}
