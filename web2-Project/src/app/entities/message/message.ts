import { User } from '../user/user';

export class Message {
    withUser: User;
    fromUserEmail: string;
    toUserEmail: string;
    text: string;
    date: Date;
    isUnread: boolean;

    constructor(withUser: User, fromUserEmail: string, toUserEmail: string, text: string, date: Date, isUnread: boolean) {
        this.withUser = withUser;
        this.fromUserEmail = fromUserEmail;
        this.toUserEmail = toUserEmail;
        this.text = text;
        this.date = date;
        this.isUnread = isUnread;
    }
}
