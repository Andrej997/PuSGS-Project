import { Address }  from '../address/address';
import { Car }  from '../car/car';
import { RentACarBranch }  from '../rent-a-car-branch/rent-a-car-branch';

export class RentACarService {
    id: number;
    name: string;
    address: Address;
    description: string;
    logoImage: string;
    pricelist: Array<[string, number]>;
    carlist: Array<Car>;
    branches: Array<RentACarBranch>;
    raiting: Array<number>;
    averageRating: number;
    comments: Array<string>;

    constructor(id: number,
                name: string, 
                addressParam: Address, 
                description: string, 
                logoImage: string,
                pricelist: Array<[string, number]>, 
                carlist: Array<Car>, 
                branches: Array<RentACarBranch>,
                raiting: Array<number>,
                average: number,
                comments: Array<string>) {
        this.id = id;
        this.name = name;
        this.address = addressParam;
        this.description = description;
        this.logoImage = logoImage;
        this.pricelist = new Array<[string, number]>();
        this.pricelist = pricelist;
        this.carlist = new Array<Car>();
        this.carlist = carlist;
        this.branches = new Array<RentACarBranch>();
        this.branches = branches;
        this.raiting = new Array<number>();
        this.raiting = raiting;
        this.averageRating = average;
        this.comments = new Array<string>();
        this.comments = comments;
    }
}
