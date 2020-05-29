import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { User } from 'src/app/entities/user/user';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { FlightsService } from 'src/app/services/flights-service/flights.service';

@Component({
  selector: 'app-change-flight',
  templateUrl: './change-flight.component.html',
  styleUrls: ['./change-flight.component.css']
})
export class ChangeFlightComponent implements OnInit {
  currentUser: User;

  success: boolean = false;
  successText: string = "";

  error: boolean = false;
  errorText: string = "";

  flightId: number = 0;
  flight: Flight;

  // loading: boolean = true;

  constructor(private httpService: HttpServiceService, private router: Router,
    public authenticationService: AuthenticationService, private route: ActivatedRoute,
    private flightsService: FlightsService) {
  if (this.authenticationService.currentUserValue) { 
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser.role != 1 && this.currentUser.role != 2) {
      this.kick();
    }
  }
  else {
    this.kick();
  }
 }

  // ako ne autorizovan ili ne ulogovan korisnik pokusa da pristupi
  // ovoj stranici
  private async kick() {
    await this.delay(3000);
    this.router.navigate(['/log-in']);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit(): void {
    // this.route.params.subscribe(params => { this.flightId = params['id']; });
    // if (this.flightId == undefined)
    //         this.flightId = -1;
    // else {
    //   this.httpService.getIdAction("Flight/Seats", this.flightId).toPromise()
    //   .then(result => {
    //     this.flight = result as Flight;
    //     console.log(this.flight)
    //     this.loading = false;
    //   })
    //   .catch(
    //     err => {
    //       console.log(err)
    //       this.error = true;
    //       this.errorText = "Error while loading flight!"
    //       this.loading = false;
    //     });
    // }
  }

  getActivatedSeat() {
    // console.log(this.flightsService.getDisabledSeatNumber());
  }
}
