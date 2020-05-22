import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightsService } from 'src/app/services/flights-service/flights.service';
import { Flight } from 'src/app/entities/flight/flight';
import { User } from 'src/app/entities/user/user';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

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

  ocena: number = 0;

  loading: boolean = true;

  error: boolean = false;
  errorText: string = "";

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
        this.ocena += this.flight.ocene[index];
      }
      if (this.flight.ocene.length != 0)
        this.ocena = this.ocena / this.flight.ocene.length;

      // console.log(this.ocena);
      this.loading = false;

      this.discountPrice = this.discount();
      this.firstAwaibleSeat = this.fas();
      
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
        return ++i;
      }
    }
  }

  reserveFastFlight() {
    this.loading = true;
  }
}
