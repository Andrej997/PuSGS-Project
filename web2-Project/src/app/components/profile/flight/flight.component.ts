import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/entities/flight/flight';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightsService } from 'src/app/services/flights-service/flights.service';
import { FlightReservation } from 'src/app/entities/flight-reservation/flight-reservation';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { PlanSeatServiceService } from 'src/app/services/plain-seat-service/plan-seat-service.service';
import { FriendForFlight } from 'src/app/entities/friend-for-flight/friend-for-flight';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  id: number; 
  flight: Flight;
  currentUser: User;

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

  ocena: number = 0;

  loading: boolean = true;

  error: boolean = false;
  errorPost: boolean = false;
  errorText: string = "";
  errorPagination: boolean = false;

  success: boolean = false;
  successText: string = "";

  priceOneWayForFlight: number = 0
  priceTwoWayForFlight: number = 0

  seatId: number = 0;

  constructor(private route: ActivatedRoute, private router: Router,
      public authenticationService: AuthenticationService,
      private avioCompaniesService: AvioCompaniesService, private httpService: HttpServiceService,
      private flightsService: FlightsService, private planSeatServiceService: PlanSeatServiceService) {
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
    }
    else {
      this.kick();
    }
  }

  private async kick() {
    await this.delay(3000);
    this.router.navigate(['/log-in']);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.httpService.getIdAction("Flight", this.id).toPromise()
    .then(result => {
      this.flight = result as Flight;
      this.setPrices();
      this.ocena = 0;
      for (let index = 0; index < this.flight.ocene.length; index++) {
        this.ocena += this.flight.ocene[index].doubleValue;
      }
      if (this.flight.ocene.length != 0)
        this.ocena = this.ocena / this.flight.ocene.length;

      // console.log(this.ocena);
      this.loading = false;
      this.planSeatServiceService.setFlight(this.flight);
      console.log(this.flight);
    })
    .catch(
      err => {
        console.log(err)
        this.error = true;
        this.errorText = "Error while loading flight data!"
        this.loading = false;
      });
  }

  setPrices() {
    this.priceOneWayForFlight = this.flight.prise;
    this.priceTwoWayForFlight = this.flight.priceTwoWay;
  }

  passedFirst: boolean = false;
  getActivatedSeat() {
    //* preskacem prvi jer poziva se get sa servisa koji je inicalno prazan, 
    //* ali prilikom promene stranice, pozvace se jos jednom taj get i bice vraceno
    //* i poslednje sediste.
    if (this.passedFirst === true) {
      let seatId: number = 0;
      [this.seatsNumber, this.reservedSeats, seatId] = this.flightsService.getSeatsNumber();
      // console.log(this.flightsService.getSeatsNumber())
      // console.log(this.selectedSeats);
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
  
      // console.log(this.selectedSeats)
      // console.log(this.seatsNumber)
      // console.log('--------------------')
    }
    else {
      this.passedFirst = true;
      
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
      this.seatsNumber = 0;
      this.selectedSeats = new Array<number>();
      this.calledFriends = new Array<User>();
      this.passedFirst = false;
      // console.log('tatatatatatatatatta')
      this.flightsService.resetService();
    }
    else if (num === 2) {
      this.next = 'Book flight';
      this.prev = 'Choose seats';
      this.getActivatedSeat();
      // console.log(this.seatsNumber-1)
      this.flightsService.setSeatCount(this.seatsNumber-1);
      // console.log('-------------------')
      // console.log("this.selectedSeats.length " + this.selectedSeats.length)
      // console.log("this.seatsNumber " + this.seatsNumber)
      // console.log('-------------------')
    }
    else if (num === 3) {
      this.sumPriceForAll = this.sumPrice;
      // console.log(this.sumLuggagePrice);
      // console.log(this.sumPrice);
      
      this.next = 'None';
      this.prev = 'Cancel';
      if (this.selectedTicket == 1) {
        this.sumPrice = this.seatsNumber * this.priceOneWayForFlight;
      }
      else if (this.selectedTicket == 2) {
        this.sumPrice = this.seatsNumber * this.priceTwoWayForFlight;
      }
      // console.log(this.sumLuggagePrice);
      // console.log(this.sumPrice);
    }
  }
  nextView(): void {
    if (this.paginationNum === 1) {
      // this.getActivatedSeat();
      // console.log("this.selectedSeats.length " + this.selectedSeats.length)
      if (this.selectedSeats.length === 0 && this.passedFirst === false) {
        this.errorPagination = true;
        this.errorText = "You need to choose at least 1 seat!";
        return;
      }
      else {
        this.errorPagination = false;
      }
    }
    else if (this.paginationNum === 2) {
      let friends = this.flightsService.getCalledFriends();
      // console.log(friends.length)
      // console.log(this.selectedSeats.length)
      if (friends.length != (this.selectedSeats.length - 1)) {
        this.errorPagination = true;
        this.errorText = "Enter data for all frineds before you go to the next step!";
        return;
      }
      else {
        this.errorPagination = false;
      }
    }
    if (this.errorPagination === false){
      // console.log("Usao")
      if (this.paginationNum < 3)
        this.paginationNum += 1;
      this.setControlerNextPrev(this.paginationNum);
    }
  }

  previousView(): void {
    if (this.paginationNum == 3) {
      this.paginationNum = 0;
      this.setControlerNextPrev(0);
      return;
    }
    this.errorPagination = false;
    if (this.paginationNum > 0)
      this.paginationNum -= 1;
    this.setControlerNextPrev(this.paginationNum);
  }

  bookFlight() {
    this.paginationNum = 4;
    this.calledFriends = this.flightsService.getCalledFriends();
    console.log(this.calledFriends);
    // let flightReservation = new FlightReservation();
    // flightReservation.avioCompanyId = this.flight.idCompany;
    // flightReservation.flightId = this.flight.id;

    // // ! ------------   ZA REZERVACIJU AUTA!!!!

    // for (let i = 0; i < this.calledFriends.length; ++i) {
    //   let elStr: string = this.calledFriends[i].email + '//' + 
    //       this.calledFriends[i].firstName + '//' + this.calledFriends[i].lastName + '//' + 
    //       this.selectedSeats[i + 1];
    //   flightReservation.friends.push(elStr);
    // } 
    console.log(this.selectedSeats);
    // flightReservation.totalPrice = this.sumPriceForAll;

    // console.log(flightReservation);
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

  
  checked: boolean = false;
  checkCheckBoxvalue(event) {
    if (this.currentUser.bonus > 0) {
      this.checked = event.target.checked;
      if (this.checked === true) {
        let discount1:number = this.currentUser.bonus / 100;
        let minusPrice1:number = this.priceOneWayForFlight * discount1;
        let minusPrice2:number = this.priceTwoWayForFlight * discount1;
        this.priceOneWayForFlight -= minusPrice1;
        this.priceTwoWayForFlight -= minusPrice2;
      }
      else {
        this.setPrices();
      }
    }
  }

  cancelReservationi() {
    this.paginationNum = 0;
    this.next = 'Choose seats';
    this.prev = 'None';
    this.setPrices();
  }

  setRentACat() {
    this.reserveThisAvio(true);
  }

  dontSetRentACat() {
    this.reserveThisAvio(false);
  }

  reserveThisAvio(rentACar: boolean) {
    let flightReservation = new FlightReservation();
    flightReservation.flightId = this.flight.id;

    if (this.sumPriceForAll === 0)
      flightReservation.price = this.sumPrice;
    else
      flightReservation.price = this.sumPriceForAll;

    flightReservation.seatNumeration = this.selectedSeats[0];
    flightReservation.UserIdForPOST = this.currentUser.id.toString();
    flightReservation.seatId = this.flight.allSeatsForThisFlight[this.selectedSeats[0]-1].id;
    flightReservation.userBonus = this.checked;
    flightReservation.dateNow = new Date();
    flightReservation.rentACar = rentACar;
    flightReservation.friendForFlights = new Array<FriendForFlight>();
    let i: number = 1;
    this.calledFriends.forEach(element => {
      let friendForFlight: FriendForFlight = new FriendForFlight();
      friendForFlight.email = element.email;
      friendForFlight.ime = element.firstName;
      friendForFlight.prezime = element.lastName;
      friendForFlight.seatNumber = this.selectedSeats[i];
      friendForFlight.seatId = this.flight.allSeatsForThisFlight[this.selectedSeats[i]-1].id;

      ++i;

      flightReservation.friendForFlights.push(friendForFlight);
    });

    //console.log(flightReservation);

    this.httpService.postAction('FlightReservation', 'Reserve', flightReservation).subscribe(
      res => { 
        this.successText = "Reservation successfully created!";
        this.router.navigate(['/reservations/' + this.currentUser.id.toString()]);
        this.success = true;
        this.errorPost = false; 
      },
      err => { 
        this.errorText = "Some of the selected seats are reserved, refresh the page!"; 
        this.errorPost = true; 
        this.success = false;
      }
    );
  }
}
