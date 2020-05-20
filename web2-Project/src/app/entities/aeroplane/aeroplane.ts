import { AvioSediste } from '../avio-sediste/avio-sediste';

export class Aeroplane {
    id: number; // id aviona
    name: string;
    numSeats: number; // broj mesta
    allSeats: Array<AvioSediste>; // lista sedista

    deleted: boolean;

    constructor(id: number, name: string, numSeats: number, allSeats: Array<AvioSediste>) {
        this.id = id;
        this.name = name;
        this.numSeats = numSeats;
        this.allSeats = allSeats;

        this.deleted = false;
    }
}
