import { Injectable } from '@angular/core';
import { Car } from 'src/app/entities/car/car';
import { CardCity } from 'src/app/entities/card-city/card-city';

import { Address }  from 'src/app/entities/address/address';
import { RentACarBranch }  from 'src/app/entities/rent-a-car-branch/rent-a-car-branch';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  
  constructor() { }

  loadCars() {
    return this.mockedCars();
  }
  loadCardsCity(){
    return this.mockedCardsCity();
  }
  loadAllCarServices(){
    return this.mockedCarServices();
  }

  mockedCarServices() {
    let allServices = new Array<RentACarService>();
    var pe = new Address("Yongdingmen Inner St", "Peking", "Kina");
    var sm = new Address("500 W Temple St", "Los angeles", "SAD");
    var ns = new Address("30 Water St", "New york", "SAD"); 
    var tv = new Address("Никитский пер 2,", "Moskva", "Rusija"); 

    var pricelist = new Array<number>();
    pricelist.push(99, 88, 123, 456); 
    var carlist =  new Array<Car>();
    carlist = this.loadCars(); 
    var branches =  Array<RentACarBranch>();
    var branchSM = new RentACarBranch(sm);
    var branchNS = new RentACarBranch(ns);
    branches.push(branchSM);
    branches.push(branchNS);
    var raiting =  Array<number>();
    var raiting1 =  Array<number>();
    raiting.push(4, 5, 1, 2, 3);
    raiting1.push(4, 1, 1, 2, 5);
    var comments = Array<string>();
    comments.push("Komentar1");
    comments.push("Komentar2");
    comments.push("Komentar3");
    var image = "../../../assets/img/rent-a-car-logo.jpg";

    const service1 = new RentACarService(123, 
                                         "Euro car", 
                                         sm, 
                                         "Neki promotivni opis...", 
                                         image,
                                         pricelist, 
                                         carlist, 
                                         branches, 
                                         raiting, 
                                         comments);
    const service2 = new RentACarService(456,
                                         "Cartize Company", 
                                         ns, 
                                        "Neki promotivni opis...",
                                        image, 
                                        pricelist, 
                                        carlist, 
                                        branches, 
                                        raiting1, 
                                        comments);
    const service3 = new RentACarService(789,
                                         "Queen", 
                                         tv, 
                                         "Neki promotivni opis...", 
                                         image,
                                         pricelist, 
                                         carlist, 
                                         branches, 
                                         raiting, 
                                         comments);
    const service4 = new RentACarService(989,
                                          "Covid19+", 
                                          pe, 
                                          "Neki promotivni opis...", 
                                          image,
                                          pricelist, 
                                          carlist, 
                                          branches, 
                                          raiting, 
                                          comments);
      
    allServices.push(service1);
    allServices.push(service2);
    allServices.push(service3);
    allServices.push(service4);

    return allServices;
  }
  getService(id: number) : RentACarService{
    var allServices = this.loadAllCarServices();
    var oneService: RentACarService;
    allServices.forEach(element => {
      if (element.id == id){
        oneService = element;
      }
        
    });
    return oneService;
  }
  getServicesInCity(city: string): RentACarService[] {
    var allServices = this.loadAllCarServices();
    let services = new  Array<RentACarService>();
    
    allServices.forEach(element => {
      if (element.address.city.toString() == city.toString()){
        services.push(element);
        console.log(element);
      }
      else{
        console.log("else");
        console.log(element);

      }
        
    });
    console.log("gotovo");
    return services;
  }

  mockedCars(): Array<Car> {
    let allCars = new Array<Car>();
    var audi = "../../../assets/img/2020-audi-rs6-avant.jpg";
    var ford = "../../../assets/img/mustang.jpg";
    var vw = "../../../assets/img/vw-scirocco.jpg";

    const car1 = new Car(1, audi, "Audi", "RS6", "Avant", 2020, 999);
    const car2 = new Car(2, ford, "Ford", "Mustang GT", "Supercar", 2020, 899);
    const car3 = new Car(3, vw,  "Volkswagen", "Scirocco", "Hatchback", 2020, 799);
    
    allCars.push(car1);
    allCars.push(car2);
    allCars.push(car3);

    return allCars;
  }
  mockedCardsCity(): Array<CardCity> {
    let allCards = new Array<CardCity>();
    let ny = new Array<string>();
    let ny1 = new Array<string>();
    let ny2 = new Array<string>();
    ny.push("../../../assets/img/new york.jpg");
    ny.push("../../../assets/img/los angeles.jpg");

    ny1.push("../../../assets/img/peking.jpg");
    ny1.push("../../../assets/img/new york.jpg");

    ny2.push("../../../assets/img/moskva.jpg");
    ny2.push("../../../assets/img/los angeles.jpg");
   

    const card1 = new CardCity("New york", "Neki opis ovde stoji..xD", ny);
    const card2 = new CardCity("Peking", "Neki opis i ovde stoji..xD", ny1);
    const card4 = new CardCity("Moskva", "Neki opis i ovde stoji..xD", ny2);

    allCards.push(card1);
    allCards.push(card2);
    allCards.push(card4);

    return allCards;
  }
}
