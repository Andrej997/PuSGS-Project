export class Car {
    id: number;
    image: string;
    brand: string;
    model: string;
    type: string;
    cm3: number; 
    kw: number; 
    doors: number;
    gear: string;
    fuel: string;
    year: number;
    pricePerDay: number;
    seats: number;
    freeSeats: number;
    trunk: number;
    raiting: Array<number>;
    averageRating: number;

    babySeat: boolean;
    navigation: boolean;
    roofRack: boolean;
    

    constructor(id: number,
                image: string, 
                brand: string, 
                model: string, 
                type: string, 
                cm3: number,
                kw: number,
                doors: number,
                gear: string,
                fuel: string,
                year: number, 
                seats: number, 
                freeSeats: number, 
                trunk: number, 
                pricePerDay: number,
                raiting: Array<number>,
                average: number,
                babySeat: boolean,
                navigation: boolean,
                roofRack: boolean) {
        this.id = id;
        this.image = image;
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.gear = gear;
        this.cm3 = cm3;
        this.kw = kw;
        this.doors = doors;
        this.fuel = fuel;
        this.year = year;
        this.seats = seats;
        this.freeSeats = freeSeats;
        this.trunk = trunk;
        this.pricePerDay = pricePerDay;
        this.raiting = new Array<number>();
        this.raiting = raiting;
        this.averageRating = average;
        this.babySeat = babySeat;
        this.navigation = navigation;
        this.roofRack = roofRack;
    }
}
