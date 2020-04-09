import { Address }  from '../address/address';
import { Car }  from '../car/car';
import { RentACarBranch }  from '../rent-a-car-branch/rent-a-car-branch';

export class RentACarService {
    name: string;
    address: Address;
    description: string;
    pricelist: Array<number>;
    carlist: Array<Car>;
    branches: Array<RentACarBranch>;
    raiting: Array<number>;
    comments: Array<string>;

    constructor(name: string, 
                addressParam: Address, 
                description: string, 
                pricelist: Array<number>, 
                carlist: Array<Car>, 
                branches: Array<RentACarBranch>,
                raiting: Array<number>,
                comments: Array<string>) {
        this.name = name;
        this.address = addressParam;
        this.description = description;
        this.pricelist = new Array<number>();
        this.pricelist = pricelist;
        this.carlist = new Array<Car>();
        this.carlist = carlist;
        this.branches = new Array<RentACarBranch>();
        this.branches = branches;
        this.raiting = new Array<number>();
        this.raiting = raiting;
        this.comments = new Array<string>();
        this.comments = comments;
    }
}
