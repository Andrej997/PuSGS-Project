export class CardCity {
    city: string;
    description: string;
    images: Array<string>;

    constructor(nameCity: string, desc: string, images: Array<string>){
        this.city = nameCity;
        this.description = desc;
        
        this.images = new Array();
        this.images = images;
    }
}
