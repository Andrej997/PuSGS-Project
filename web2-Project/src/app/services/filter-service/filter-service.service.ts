import { Injectable } from '@angular/core';
import { Car } from 'src/app/entities/car/car';
import { CardCity } from 'src/app/entities/card-city/card-city';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { AbstractFilterParam } from 'src/app/entities/abstract-filter-param/abstract-filter-param';
import { StringFilterParam } from 'src/app/entities/string-filter-param/string-filter-param';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {
  cards = new Array<CardCity>();
  private c = new BehaviorSubject<Array<CardCity>>(this.cards);
  cm = this.c.asObservable();

  constructor(private carService: CarServiceService) { }

  changeFilter(filter: AbstractFilterParam){
    //this.c.next(this.loadCardsCity());
    this.c.next(this.filterCities(this.carService.loadCardsCity(), filter));
    //console.log(this.cards);
  }

  filterCities(allCity: CardCity[], filterParam: AbstractFilterParam): CardCity[] {
    let filteredCities = new Array<CardCity>();
    if( typeof filterParam == 'undefined'){
      //console.log("iffffff");
      //console.log(typeof filterParam);
      return filteredCities;
    }

    for (const city of allCity) {
      if (!this.checkCityFilter(city, filterParam)) {
        filteredCities.push(city);
          //break;
      }
    }
    return filteredCities;
  }

  checkCityFilter(city: CardCity, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && 
           filterParam.getFilterParamName() === 'searchCity' && 
           !city.city.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase()
           );
  }

}