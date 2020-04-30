import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightsService } from 'src/app/services/flights-service/flights.service';
import { Flight } from 'src/app/entities/flight/flight';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-fast-flight-reservation',
  templateUrl: './fast-flight-reservation.component.html',
  styleUrls: ['./fast-flight-reservation.component.css']
})
export class FastFlightReservationComponent implements OnInit {
  id: string; // this is from link and will contain companyid and flightid
  flight: Flight;
  currentUser: User;
  idF: number; // flightID
  idC: number; // companyID
  seatsNumber: number = 0;

  discountPrice: number = 0;

  firstAwaibleSeat: number = 0;

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
    this.flightsService.setFlight(this.flight);
    this.discountPrice = this.discount();
    this.firstAwaibleSeat = this.fas();
  }

  private parseId(id: string): void {
    this.idC = parseInt(id.split('v')[0]);
    this.idF = parseInt(id.split('v')[1]);
  }

  private discount(): number {
    const regularPrice = this.flight.prise;
    const discount = this.flight.discountForFastReservation;
    return regularPrice - (regularPrice/discount);
  }

  // prvo slobodno mesto koje je za przu rezervaciju
  private fas(): number {
    for (let i = 0; i < this.flight.aeroplane.allSeats.length; ++i) {
      // ako je namenjeno za brzu rezervaciju i ako je slobodno
      if (this.flight.aeroplane.allSeats[i].isFastReservation === true && this.flight.aeroplane.allSeats[i].rezervisano === false) {
        return ++i;
      }
    }
  }
}
