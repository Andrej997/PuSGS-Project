import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user'
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { CardCity } from 'src/app/entities/card-city/card-city';

@Component({
  selector: 'app-rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent implements OnInit {
  currentUser: User;
  currentUserEmail = '';

  allCity: Array<CardCity>;

  constructor(
      private carService: CarServiceService,
      public authenticationService: AuthenticationService) {
        if (this.authenticationService.currentUserValue) { 
          this.currentUser = this.authenticationService.currentUserValue;
          this.currentUserEmail = this.currentUser.email;
        }
    
      this.allCity = this.carService.loadCardsCity();
   }


  ngOnInit(): void {
  }

}
