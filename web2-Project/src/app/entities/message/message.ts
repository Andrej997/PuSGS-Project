export class Message {
    fromUserEmail: string;
    toUserEmail: string;
    text: string;
    date: Date;
    isUnread: boolean;

    constructor(fromUserEmail: string, toUserEmail: string, text: string, date: Date, isUnread: boolean) {
        this.fromUserEmail = fromUserEmail;
        this.toUserEmail = toUserEmail;
        this.text = text;
        this.date = date;
        this.isUnread = isUnread;
    }
}
