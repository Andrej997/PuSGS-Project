import { Component, OnInit } from '@angular/core';
import { FastFlightReservation } from 'src/app/entities/fast-flight-reservation/fast-flight-reservation';
import { User } from 'src/app/entities/user/user';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-flight-reservation',
  templateUrl: './flight-reservation.component.html',
  styleUrls: ['./flight-reservation.component.css']
})
export class FlightReservationComponent implements OnInit {
  currentUser: User;
  id: string = "";

  allFastFlightReservation: Array<FastFlightReservation> = new Array<FastFlightReservation>(); 

  error: boolean = false;
  errorFFR: boolean = false;
  errorText: string = "";

  change: boolean = false;
  constructor(private httpService: HttpServiceService, private router: Router,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute) { 
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
  private async kick() {
    await this.delay(3000);
    this.router.navigate(['/log-in']);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.httpService.getUserIdAction('FastFlightReservation', this.id)
      .toPromise()
      .then(result => {
        this.allFastFlightReservation = result as FastFlightReservation[];
        //console.log(this.allFastFlightReservation);
      })
      .catch(
        err => {
          console.log(err)
          this.error = true;
          this.errorText = "Error while loading reservations!"
        });
  }

  refreshPage() {
    location.reload();
  }

  cancelFastReservation(event) {
    const idDeleteFFR = event.target.id;
    
    let ffr: FastFlightReservation = null;
    for (let i = 0; i < this.allFastFlightReservation.length; ++i) {
      if (this.allFastFlightReservation[i].id == idDeleteFFR) {
        ffr = this.allFastFlightReservation[i];
        break;
      }
    }
    if (ffr != null) {
      let date = new Date();
      let deteOfFlight = new Date(ffr.flight.datumPolaska);
      if (date.getFullYear() <= deteOfFlight.getFullYear()) {
        if (date.getMonth() <= deteOfFlight.getMonth()) {
          if (date.getDay() <= deteOfFlight.getDay()) {
            let hours = deteOfFlight.getHours() - date.getHours();
            if (hours > 3) {
              this.errorFFR = false;
              this.errorText = "";
              this.httpService.deleteAction("FastFlightReservation", "DeleteFFR", idDeleteFFR).toPromise()
                  .then(result => {
                    this.change = true;
                  })
                  .catch(
                    err => {
                      console.log(err);
                      this.error = true;
                    });
            }
            else {
              this.errorFFR = true;
              this.errorText = "You can't that cancel flight!";
            }
          }
          else {
            this.errorFFR = true;
            this.errorText = "You can't that cancel flight!";
          }
        }
        else {
          this.errorFFR = true;
          this.errorText = "You can't that cancel flight!";
        }
      }
      else {
        this.errorFFR = true;
        this.errorText = "You can't that cancel flight!";
      }
    }
  }

}
