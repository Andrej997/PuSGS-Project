import { Address } from '../address/address';

export class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
    address: Address;

    constructor(firstName: string, lastName: string, email: string, password: string, profileImage: string, address: Address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.profileImage = profileImage;
        this.address = address;
    }
}
