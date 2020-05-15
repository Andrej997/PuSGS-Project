import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/entities/flight/flight';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightsService } from 'src/app/services/flights-service/flights.service';
import { Friend } from 'src/app/entities/friend/friend';
import { FlightReservation } from 'src/app/entities/flight-reservation/flight-reservation';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  id: string; // !this is from link and will contain companyid and flightid
  flight: Flight;
  currentUser: User;
  idF: number; // flightID
  idC: number; // companyID
  seatsNumber: number = 0;
  selectedSeats: Array<number>;
  sumPrice: number = 0;

  paginationNum: number = 0;
  next: string = 'Choose seats';
  prev: string = 'None';

  calledFriends: Array<User>; // ovde ce se iz flight-call-friends.component preko flight.service stavljati useri koji su pozvati za putovanje

  private reservedSeats: Array<boolean>;

  selectedTicket = 1;
  carryOn = 1;
  personalBag = 1;
  fullSizeSpiner = 1;
  largeDuffel = 1;
  sumLuggagePrice = 0;

  sumPriceForAll = 0;

  constructor(private route: ActivatedRoute, private router: Router,
    public authenticationService: AuthenticationService,
    private avioCompaniesService: AvioCompaniesService,
    private flightsService: FlightsService) {
      if (this.authenticationService.currentUserValue) { 
        this.currentUser = this.authenticationService.currentUserValue;
      }
      else {
        this.kick();
      }
      route.params.subscribe(params => { this.id = params['id']; });
      //console.log(this.id);
    }

  private async kick() {
    await this.delay(3000);
    this.router.navigate(['/log-in']);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  ngOnInit(): void {
    this.parseId(this.id);
    this.flight = this.avioCompaniesService.getFlightProfile(this.idC, this.idF);
    this.flightsService.setFlight(this.flight);
    console.log(this.flight);
  }

  private parseId(id: string): void {
    this.idC = parseInt(id.split('v')[0]);
    this.idF = parseInt(id.split('v')[1]);
  }

  getActivatedSeat() {

    let seatId: number = 0;
    [this.seatsNumber, this.reservedSeats, seatId] = this.flightsService.getSeatsNumber();

    if (this.selectedSeats.includes(seatId))
      for (let i = 0; i < this.selectedSeats.length; ++i) {
        if (this.selectedSeats[i] == seatId) {
          this.selectedSeats.splice(i, 1);
          break;
        }
      }
    else 
      this.selectedSeats.push(seatId);

    //! sortiraj po rastucem
    this.selectedSeats.sort(function(a, b) { return a - b });

    //*console.log(this.selectedSeats)
    if (this.selectedTicket == 1) {
      this.sumPrice = this.seatsNumber * this.flight.prise;
    }
    else if (this.selectedTicket == 2) {
      this.sumPrice = this.seatsNumber * this.flight.priceTwoWay;
    }
  }

  createRange(number) {   // simulacija for petlje u html-u
    var items: number[] = [];
    for(var i = 1; i <= number-1; i++){
       items.push(i);
    }
    return items;
  }

  private setControlerNextPrev(num: number): void {
    if (num === 0) {
      this.next = 'Choose seats';
      this.prev = 'None';
    }
    else if (num === 1) {
      this.next = 'Call friends';
      this.prev = 'Flight details';
      this.sumPrice = 0;
      this.selectedSeats = new Array<number>();
    }
    else if (num === 2) {
      this.next = 'Rent a car';
      this.prev = 'Choose seats';
      this.calledFriends = new Array<User>();
    }
    else if (num === 3) {
      this.next = 'Book flight';
      this.prev = 'Call friends';
    }
    else if (num === 4) {
      this.sumPriceForAll = this.sumPrice;
      this.next = 'None';
      this.prev = 'Rent a car';
    }
  }

  nextView(): void {
    if (this.paginationNum < 4)
      this.paginationNum += 1;
    this.setControlerNextPrev(this.paginationNum);
  }

  previousView(): void {
    if (this.paginationNum > 0)
      this.paginationNum -= 1;
    this.setControlerNextPrev(this.paginationNum);
  }

  bookFlight() {
    this.calledFriends = this.flightsService.getCalledFriends();
    console.log(this.calledFriends);
    let flightReservation = new FlightReservation();
    flightReservation.avioCompanyId = this.flight.idCompany;
    flightReservation.flightId = this.flight.id;

    // ! ------------   ZA REZERVACIJU AUTA!!!!

    for (let i = 0; i < this.calledFriends.length; ++i) {
      let elStr: string = this.calledFriends[i].email + '//' + 
          this.calledFriends[i].firstName + '//' + this.calledFriends[i].lastName + '//' + 
          this.selectedSeats[i + 1];
      flightReservation.friends.push(elStr);
    } 
    flightReservation.reservedSeatsIds = this.selectedSeats[0]; //! moje sediste
    flightReservation.totalPrice = this.sumPriceForAll;

    this.flightsService.addReservation(this.selectedSeats);

    console.log(flightReservation);
  }

  luggageF() {
    let co = 0;
    let pb = 0;
    let fss = 0;
    let ld = 0;
    if (this.carryOn > 1)
      co = (this.carryOn-1) * this.flight.luggage.priceCarryOn;
    if (this.personalBag > 1)
      pb = (this.personalBag-1) * this.flight.luggage.pricePersonalBag;
    if (this.fullSizeSpiner > 1)
      fss = (this.fullSizeSpiner-1) * this.flight.luggage.priceFullSizeSpinner;
    if (this.largeDuffel > 1)
      ld = (this.largeDuffel-1) * this.flight.luggage.priceLargeDuffel;

    this.sumLuggagePrice = co + pb + fss + ld;

    this.sumPriceForAll = this.sumPrice + this.sumLuggagePrice;
  }
}
