
export class Message {
    name: string; // ime posiljaoca ove poruke
    text: string; // sadrzaj poruke
    date: Date; // vreme kad je poslata
    isUnread: boolean; // da li je procitana

    constructor(name: string, text: string, date: Date, isUnread: boolean) {
        this.name = name;
        this.text = text;
        this.date = date;
        this.isUnread = isUnread;
    }
}
