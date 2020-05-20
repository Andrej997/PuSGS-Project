export class AvioLuggage {
    priceCarryOn: number;
    pricePersonalBag: number;
    priceFullSizeSpinner: number;
    priceLargeDuffel: number;

    deleted: boolean;

    //! svi su inicilano na 0, jer mozda neka avio kompanija za svoj let ne zeli da naplati dodatan prtljag
    constructor(priceCarryOn: number = 0, pricePersonalBag: number = 0, 
        priceFullSizeSpinner: number = 0, priceLargeDuffel: number = 0) {
            this.priceCarryOn = priceCarryOn;
            this.pricePersonalBag = pricePersonalBag;
            this.priceFullSizeSpinner = priceFullSizeSpinner;
            this.priceLargeDuffel = priceLargeDuffel;

            this.deleted = false;
        }
}
