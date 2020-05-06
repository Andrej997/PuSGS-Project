import { Address } from '../address/address';

export class FlightDestination {
    startAddress: Address;
    endAddress: Address;

    constructor(startAddress: Address, endAddress: Address) {
        this.startAddress = startAddress;
        this.endAddress = endAddress;
    }
}
