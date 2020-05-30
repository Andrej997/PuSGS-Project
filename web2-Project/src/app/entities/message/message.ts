
export class Message {
    id: number;
    myId: string; 
    hisId: string;
    text: string; // sadrzaj poruke
    dateTime: Date; // vreme kad je poslata
    isUnread: boolean; // da li je procitana

    constructor(myId: string, text: string, date: Date, isUnread: boolean) {
        this.myId = myId;
        this.text = text;
        this.dateTime = date;
        this.isUnread = isUnread;
    }
}
