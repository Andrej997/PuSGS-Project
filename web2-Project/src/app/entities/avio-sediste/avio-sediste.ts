export class AvioSediste {
    id: number;
    reserved: boolean;
    isFastReservation: boolean;

    constructor(id: number, reserved: boolean, isFastReservation: boolean) {
        this.id = id;
        this.reserved = reserved;
        this.isFastReservation = isFastReservation;
    }
}
