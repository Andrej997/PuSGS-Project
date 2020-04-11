export class FilterFlight {
    datefrom: Date;
    dateto: Date;
    pricefrom: number;
    priceto: number;
    distancefrom: number;
    distanceto: number;
    changeoverfrom: number;
    changeoverto: number;

    constructor(datefrom: Date,
        dateto: Date,
        pricefrom: number,
        priceto: number,
        distancefrom: number,
        distanceto: number,
        changeoverfrom: number,
        changeoverto: number) {
            this.datefrom = datefrom;
            this.dateto = dateto;
            this.pricefrom = pricefrom;
            this.priceto = priceto;
            this.distancefrom = distancefrom;
            this.distanceto = distanceto;
            this.changeoverfrom = changeoverfrom;
            this.changeoverto = changeoverto;
        }
}
