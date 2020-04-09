import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { FlightsService } from 'src/app/services/flights-service/flights.service';

import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  currentUser: User;
  currentUserEmail = '';

  allFlights: Array<Flight>;
  constructor(
      private flightsService: FlightsService,
      public authenticationService: AuthenticationService,
      private avioCompaniesService: AvioCompaniesService) {
        if (this.authenticationService.currentUserValue) { 
          this.currentUser = this.authenticationService.currentUserValue;
          this.currentUserEmail = this.currentUser.email;
        }
      this.allFlights = avioCompaniesService.getAllFligths();
      //console.log(this.allFlights);
      //this.allFlights = this.flightsService.loadFlights();
   }

  ngOnInit(): void {
  }



}
