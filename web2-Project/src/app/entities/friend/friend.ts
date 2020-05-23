import { User } from '../user/user';
import { Message } from '../message/message';

export class Friend {
    id: number;
    friend: User;  // ko je taj friend
    messages: Array<Message>; // lista njihovih poruka

    constructor(friend: User, messages: Array<Message>) {
        this.friend = friend;
        this.messages = messages;
    }
}
