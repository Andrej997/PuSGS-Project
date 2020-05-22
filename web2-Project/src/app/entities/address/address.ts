export class Address {
    id: number; //! stavio sam jer i to dolazi sa servera, nije potrebno u constructoru da stoji jer ce to server sam da kreira, ali treba prilikom povratka podataka prilikom PUT-a
    streetAndNumber: string;
    city: string;
    country: string;

    deleted: boolean;

    constructor(streetAndNumber: string, city: string, country: string) {
        this.streetAndNumber = streetAndNumber;
        this.city = city;
        this.country = country;

        this.deleted = false;
    }
}
