import { Address } from '../address/address';
import { Message } from '../message/message';

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
    friends: Array<User>; // lista prijatelja
    friendRequests: Array<User>; // lista zahteva za prijateljstvo
    waitingForAccept: Array<User>; // lista poslatih zahteva za prijateljstvo
    messages: Array<Message>; 
    authdata?: string;

    constructor(id: number, firstName: string, lastName: string, 
        email: string, password: string, 
        profileImage: string, address: Address, role: Role, 
        friends: Array<User>, friendRequests: Array<User>, waitingForAccept: Array<User>,
        messages: Array<Message>) {
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
            this.messages = messages;
    }
}
