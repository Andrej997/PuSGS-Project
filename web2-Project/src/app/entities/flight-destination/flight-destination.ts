import { Address } from '../address/address';

export class FlightDestination {
    id: number;
    companyId: number;
    startAddress: Address;
    endAddress: Address;

    deleted: boolean;

    constructor(startAddress: Address, endAddress: Address) {
        this.startAddress = startAddress;
        this.endAddress = endAddress;
        this.deleted = false;
    }
}
