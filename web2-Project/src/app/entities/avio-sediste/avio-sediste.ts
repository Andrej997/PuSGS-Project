export class AvioSediste {
    id: number;
    reserved: boolean;
    isFastReservation: boolean;

    //* admin moze da posatavlja, tj. da deaktivira sediste
    isDisabled: boolean;

    deleted: boolean;

    constructor(id: number, reserved: boolean, isFastReservation: boolean) {
        this.id = id;
        this.reserved = reserved;
        this.isFastReservation = isFastReservation;

        this.isDisabled = false;
        this.deleted = false;
    }
}
