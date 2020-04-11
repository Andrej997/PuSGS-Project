import { Injectable } from '@angular/core';
import { Car } from 'src/app/entities/car/car';
import { CardCity } from 'src/app/entities/card-city/card-city';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  // cards = new Array<CardCity>();
  // private c = new BehaviorSubject<Array<CardCity>>(this.cards);
  // cm = this.c.asObservable();

  constructor() { }

  // changeFilter(filter: string){
  //   //this.c.next(this.loadCardsCity());
  //   this.c.next(this.filterCities(this.loadCardsCity(), filter));
  //   //console.log(this.cards);
  // }

  // filterCities(allCity: CardCity[], filterParam: string): CardCity[] {
  //   let filteredCities = new Array<CardCity>();
  //   for (const city of allCity) {
  //     let addCar = true;
  //     if (city.city === filterParam) {
  //       filteredCities.push(city);
  //         //break;
  //     }
  //   }
  //   return filteredCities;
  // }

  loadCars() {
    //console.log('Učitavanje auta...');
    return this.mockedCars();
  }
  loadCardsCity(){
    //console.log('Učitavanje gradova...');
    return this.mockedCardsCity();
  }

  mockedCars(): Array<Car> {
    let allCars = new Array<Car>();

    const car1 = new Car(1, "Audi", "RS6", "Avant", 2020, 999);
    const car2 = new Car(2, "Ford", "Mustang GT", "Supercar", 2020, 899);
    const car3 = new Car(3, "Volkswagen", "Scirocco", "Hatchback", 2020, 799);
    
    allCars.push(car1);
    allCars.push(car2);
    allCars.push(car3);

    return allCars;
  }
  mockedCardsCity(): Array<CardCity> {
    let allCards = new Array<CardCity>();
    let ny = new Array<string>();
    ny.push("../../../assets/img/peking.jpg");
    ny.push("../../../assets/img/los angeles.jpg");
    ny.push("../../../assets/img/moskva.jpg");

    const card1 = new CardCity("New york", "Neki opis ovde stoji..xD", ny);
    const card2 = new CardCity("Peking", "Neki opis i ovde stoji..xD", ny);
    const card3 = new CardCity("Peking", "Neki opis i ovde stoji..xD", ny);
    const card4 = new CardCity("Moskva", "Neki opis i ovde stoji..xD", ny);

    allCards.push(card1);
    allCards.push(card2);
    allCards.push(card3);
    allCards.push(card4);

    return allCards;
  }
}
