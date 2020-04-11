export class Car {
    id: number;
    image: string;
    brand: string;
    model: string;
    type: string;
    year: number;
    pricePerDay: number;

    constructor(id: number,image: string, brand: string, model: string, type: string, year: number, pricePerDay: number) {
        this.id = id;
        this.image = image;
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.year = year;
        this.pricePerDay = pricePerDay;
    }
}
