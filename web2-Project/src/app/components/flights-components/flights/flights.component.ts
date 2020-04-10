import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { FlightsService } from 'src/app/services/flights-service/flights.service';

import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { User } from 'src/app/entities/user/user';
import { SearchFlight } from 'src/app/entities/search-flight/search-flight';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  currentUser: User;
  currentUserEmail = '';

  allFlights: Array<Flight>;
  allFlightsCopy: Array<Flight>; // jer ne postoji baza trenutno
  constructor(
      private flightsService: FlightsService,
      public authenticationService: AuthenticationService,
      private avioCompaniesService: AvioCompaniesService) {
        if (this.authenticationService.currentUserValue) { 
          this.currentUser = this.authenticationService.currentUserValue;
          this.currentUserEmail = this.currentUser.email;
        }
      this.allFlights = avioCompaniesService.getAllFligths();
      this.allFlightsCopy = this.allFlights;
      //console.log(this.allFlights);
      //this.allFlights = this.flightsService.loadFlights();
   }

  ngOnInit(): void {
  }

  cancelSearch(){
    this.allFlights = this.allFlightsCopy;
  }

  search(searchFlights: SearchFlight): void {
    this.allFlights = this.allFlightsCopy;
    let searched = new Array<Flight>();
    if (searchFlights.selectType == 1) { // ako je po kompanijama
      this.allFlights.forEach(element => {
        if (element.company === searchFlights.inputSearch) { // ako postoji ta kompanija
          searched.push(element);
        }
      });
    }
    else if (searchFlights.selectType == 2) { // ako je po gradu polaska
      this.allFlights.forEach(element => {
        if (element.from === searchFlights.inputSearch) { // ako postoji ta kompanija
          searched.push(element);
        }
      });
    }
    else if (searchFlights.selectType == 3) { // ako je po gradu sletanja
      this.allFlights.forEach(element => {
        if (element.to === searchFlights.inputSearch) { // ako postoji ta kompanija
          searched.push(element);
        }
      });
    }
    if (searched.length > 0) {
      this.allFlights = searched;
    }
  }

}
