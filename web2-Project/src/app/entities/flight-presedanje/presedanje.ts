import { StringForICollection } from '../StringForICollection/string-for-icollection';

export class Presedanje {
    id: number;
    brojPresedanja: number;
    gradoviPresedanja: Array<StringForICollection>;

    deleted: boolean;

    constructor(brojPresedanja: number, gradoviPresedanja: Array<StringForICollection>) {
        this.brojPresedanja = brojPresedanja;
        this.gradoviPresedanja = gradoviPresedanja;

        this.deleted = false;
    }
}
