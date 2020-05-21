import { Address } from '../address/address';
import { Message } from '../message/message';
import { Friend } from '../friend/friend';

export enum Role {
    admin = 1,
    adminA,
    adminM,
    user
}

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
    address: Address;
    role: Role;
    friends: Array<Friend>; // lista prijatelja
    friendRequests: Array<User>; // lista zahteva za prijateljstvo
    waitingForAccept: Array<User>; // lista poslatih zahteva za prijateljstvo
    authdata?: string;

    //* passport: number;
    
    serviceId: number;

    constructor(id: number, firstName: string, lastName: string, 
        email: string, password: string, 
        profileImage: string, address: Address, role: Role, 
        friends: Array<Friend>, friendRequests: Array<User>, waitingForAccept: Array<User>) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.profileImage = profileImage;
            this.address = address;
            this.role = role;
            this.friends = friends;
            this.friendRequests = friendRequests;
            this.waitingForAccept = waitingForAccept;
            //* this.passport = 0;
    }
}
