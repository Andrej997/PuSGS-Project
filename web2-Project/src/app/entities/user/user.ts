import { Address } from '../address/address';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
    address: Address;
    authdata?: string;

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, profileImage: string, address: Address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.profileImage = profileImage;
        this.address = address;
    }
}
