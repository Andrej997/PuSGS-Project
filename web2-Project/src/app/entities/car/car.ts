export class Car {
    id: number;
    brand: string;
    model: string;
    type: string;
    year: number;
    pricePerDay: number;

    constructor(id: number, brand: string, model: string, type: string, year: number, pricePerDay: number) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.year = year;
        this.pricePerDay = pricePerDay;
    }
}
