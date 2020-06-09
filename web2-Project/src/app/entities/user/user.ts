import { Address } from '../address/address';
import { Message } from '../message/message';
import { Friend } from '../friend/friend';
import { FlightCompany } from '../flightCompany/flight-company';
import { FriendRequest } from '../friendRequest/friend-request';

export enum Role {
    admin = 1,
    adminA,
    adminM,
    user
}

export class User {
    Id: string;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
    address: Address;
    role: Role;
    friends: Array<Friend>; // lista prijatelja
    // friendRequests: Array<User>; // lista zahteva za prijateljstvo
    // waitingForAccept: Array<User>; // lista poslatih zahteva za prijateljstvo

    friendRequests: Array<FriendRequest>;

    authdata?: string;

    //* passport: number;

    phoneNumber: string;
    passportHash: string;
    
    serviceId: number;

    flightCompany: FlightCompany;

    bonus: number;

    constructor(id: number, firstName: string, lastName: string, 
        email: string, password: string, 
        profileImage: string, address: Address, role: Role, 
        friends: Array<Friend>, friendRequests: Array<FriendRequest>) {
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
            //* this.passport = 0;
    }
}
