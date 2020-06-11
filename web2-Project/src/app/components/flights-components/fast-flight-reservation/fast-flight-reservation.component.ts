import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightsService } from 'src/app/services/flights-service/flights.service';
import { Flight } from 'src/app/entities/flight/flight';
import { User } from 'src/app/entities/user/user';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { FastFlightReservation } from 'src/app/entities/fast-flight-reservation/fast-flight-reservation';

@Component({
  selector: 'app-fast-flight-reservation',
  templateUrl: './fast-flight-reservation.component.html',
  styleUrls: ['./fast-flight-reservation.component.css']
})
export class FastFlightReservationComponent implements OnInit {
  id: number; 
  flight: Flight;
  currentUser: User;
  seatsNumber: number = 0;

  discountPrice: number = 0;

  firstAwaibleSeat: number = 0;
  seatId: number = 0;

  ocena: number = 0;

  loading: boolean = true;

  error: boolean = false;
  errorText: string = "";

  success: boolean = false;
  successText: string = "";

  constructor(private route: ActivatedRoute, private router: Router,
    public authenticationService: AuthenticationService, private httpService: HttpServiceService,
    private avioCompaniesService: AvioCompaniesService,
    private flightsService: FlightsService) {
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
      this.ocena = 0;
      for (let index = 0; index < this.flight.ocene.length; index++) {
        this.ocena += this.flight.ocene[index].doubleValue;
      }
      if (this.flight.ocene.length != 0)
        this.ocena = this.ocena / this.flight.ocene.length;

      // console.log(this.ocena);
      this.loading = false;

      this.discountPrice = this.discount();
      this.firstAwaibleSeat = this.fas();
      if (this.firstAwaibleSeat == undefined) {
        this.firstAwaibleSeat = 0;
      }
      
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

  private discount(): number {
    const regularPrice = this.flight.prise;
    const discount = this.flight.discountForFastReservation;
    return regularPrice - (regularPrice/discount);
  }

  // prvo slobodno mesto koje je za przu rezervaciju
  private fas(): number {
    for (let i = 0; i < this.flight.allSeatsForThisFlight.length; ++i) {
      // ako je namenjeno za brzu rezervaciju i ako je slobodno
      if (this.flight.allSeatsForThisFlight[i].isFastReservation === true && this.flight.allSeatsForThisFlight[i].reserved === false) {
        //console.log(this.flight.allSeatsForThisFlight[i].id)
        this.seatId = this.flight.allSeatsForThisFlight[i].id;
        return ++i;
      }
    }
  }

  checked: boolean = false;
  checkCheckBoxvalue(event) {
    if (this.currentUser.bonus > 0) {
      this.checked = event.target.checked;
      if (this.checked === true) {
        let discount1:number = this.currentUser.bonus / 100;
        let minusPrice:number = this.discountPrice * discount1;
        this.discountPrice -= minusPrice;
      }
      else {
        this.discountPrice = this.discount();
      }
    }
  }

  reserveFastFlight() {
    //this.loading = true;
    let fastFlightReservation: FastFlightReservation = new FastFlightReservation();
    fastFlightReservation.flightId = this.flight.id;
    fastFlightReservation.price = this.discountPrice;
    fastFlightReservation.seatNumeration = this.firstAwaibleSeat;
    fastFlightReservation.UserIdForPOST = this.currentUser.id.toString();
    fastFlightReservation.seatId = this.seatId;
    fastFlightReservation.userBonus = this.checked;
    fastFlightReservation.dateNow = new Date();
    //console.log(fastFlightReservation);
    this.httpService.postAction('FastFlightReservation', 'Reserve', fastFlightReservation).subscribe(
      res => { 
        this.successText = "Reservation successfully created!";
        this.success = true;
      },
      err => { 
        this.errorText = err; 
        this.error = true; 
        this.success = false;
      }
    );
    
    //console.log(fastFlightReservation);
  }
}
