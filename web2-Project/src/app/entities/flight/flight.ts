export class Flight {
    avioNama: string;
    from: string;
    to: string;
    datumPolaska: Date;
    datumPovratka: Date;
    prise: number;

    constructor(avioNama: string, from: string, to: string, datumPolaska: Date, datumPovratka: Date, prise: number) {
        this.avioNama = avioNama;
        this.from = from;
        this.to = to;
        this.datumPolaska = datumPolaska;
        this.datumPovratka = datumPovratka;
        this.prise = prise;
    }
}
