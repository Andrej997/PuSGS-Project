import { Address } from '../address/address';

export class FlightDestination {
    address: Address;
    cena: number;

    constructor(address: Address, cena: number) {
        this.address = address;
        this.cena = cena;
    }
}
