import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/entities/flight/flight';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightsService } from 'src/app/services/flights-service/flights.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  id: string; // this is from link and will contain companyid and flightid
  flight: Flight;
  currentUser: User;
  idF: number; // flightID
  idC: number; // companyID
  seatsNumber: number = 0;
  sumPrice: number = 0;
  constructor(private route: ActivatedRoute, 
    public authenticationService: AuthenticationService,
    private avioCompaniesService: AvioCompaniesService,
    private flightsService: FlightsService) {
      if (this.authenticationService.currentUserValue) { 
        this.currentUser = this.authenticationService.currentUserValue;
      }
      route.params.subscribe(params => { this.id = params['id']; });
      //console.log(this.id);
    }

  ngOnInit(): void {
    this.parseId(this.id);
    this.flight = this.avioCompaniesService.getFlightProfile(this.idC, this.idF);
    console.log(this.flight);
  }

  private parseId(id: string): void {
    this.idC = parseInt(id.split('v')[0]);
    this.idF = parseInt(id.split('v')[1]);
  }

  getActivatedSeat() {
    let symbol: string = '';
    [this.seatsNumber, symbol] = this.flightsService.getSeatsNumber();

    if (symbol === '+') {
      this.sumPrice += this.flight.prise;
    }
    if (symbol === '-') {
      this.sumPrice -= this.flight.prise;
    }
    // console.log(this.flightsService.getSeatsNumber());
  }

  createRange(number){   // simulacija for petlje u html-u
    var items: number[] = [];
    for(var i = 1; i <= number-1; i++){
       items.push(i);
    }
    return items;
  }
}
