import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user'
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { FilterServiceService } from 'src/app/services/filter-service/filter-service.service';
import { CardCity } from 'src/app/entities/card-city/card-city';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  suggestionCity: Array<CardCity>;
  filteredCity: Array<CardCity>;
  currentUser: User;
  currentUserEmail = '';

  constructor( private filterService: FilterServiceService,
               private carService: CarServiceService,
               public authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentUserEmail = this.currentUser.email;
    }
    this.filterService.cm.subscribe(filteredCity => this.filteredCity = filteredCity);

    this.suggestionCity = this.carService.loadCardsCity();
    //this.filteredCity = this.carService.loadCardsCity();
  }
  // f(){
  //   let allCards = new Array<CardCity>();
  //   let ny = new Array<string>();
  //   ny.push("../../../assets/img/peking.jpg");
  //   ny.push("../../../assets/img/los angeles.jpg");

  //   const card1 = new CardCity("New york", "Neki opis ovde stoji..xD", ny);
  //   const card2 = new CardCity("Peking", "Neki opis i ovde stoji..xD", ny);

  //   allCards.push(card1);
  //   allCards.push(card2);

  //   this.filteredCity = allCards;
  // }

  ngOnInit(): void { }

}
