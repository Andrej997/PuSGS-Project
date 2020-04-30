export class AvioSediste {
    id: number;
    rezervisano: boolean;
    isFastReservation: boolean;

    constructor(id: number, rezervisano: boolean, isFastReservation: boolean) {
        this.id = id;
        this.rezervisano = rezervisano;
        this.isFastReservation = isFastReservation;
    }
}
