import { Component, OnInit } from '@angular/core';
import { FastFlightReservation } from 'src/app/entities/fast-flight-reservation/fast-flight-reservation';
import { User } from 'src/app/entities/user/user';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Flight } from 'src/app/entities/flight/flight';
import { FlightReservation } from 'src/app/entities/flight-reservation/flight-reservation';
import { FriendForFlight } from 'src/app/entities/friend-for-flight/friend-for-flight';

@Component({
  selector: 'app-flight-reservation',
  templateUrl: './flight-reservation.component.html',
  styleUrls: ['./flight-reservation.component.css']
})
export class FlightReservationComponent implements OnInit {
  currentUser: User;
  id: string = "";
  flight: Flight;

  allFastFlightReservation: Array<FastFlightReservation> = new Array<FastFlightReservation>(); 
  allFlightReservation: Array<FlightReservation> = new Array<FlightReservation>(); 
  allReservationCalls: Array<FriendForFlight> = new Array<FriendForFlight>();

  error: boolean = false;
  errorFFR: boolean = false;
  errorText: string = "";

  change: boolean = false;

  loading: boolean = false;

  showFlightDetails: boolean = false;

  ocenaLeta: number = 0;
  ocenaKompanije: number = 0;

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
    this.httpService.getUserIdAction('FlightReservation/Called', this.currentUser.email)
      .toPromise()
      .then(result => {
        this.allReservationCalls = result as FriendForFlight[];
      })
      .catch(
        err => {
          console.log(err)
          this.error = true;
          this.errorText = "Error while loading reservations!"
        });
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.httpService.getUserIdAction('FastFlightReservation', this.id)
      .toPromise()
      .then(result => {
        this.allFastFlightReservation = result as FastFlightReservation[];
      })
      .catch(
        err => {
          console.log(err)
          this.error = true;
          this.errorText = "Error while loading reservations!"
        });

    this.httpService.getUserIdAction('FlightReservation', this.id)
      .toPromise()
      .then(result => {
        this.allFlightReservation = result as FlightReservation[];
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

  getFlight(event){
    let ffrId = event.target.id;
    this.allFastFlightReservation.forEach(element => {
      if (ffrId == element.id){
        this.loading = true;
        this.getFlightFromServer(element.flightId);
      }
    });
  }

  getFlightFromServer(id: number) {
    this.httpService.getIdAction("Flight", id).toPromise()
    .then(result => {
      this.flight = (result as Flight);
      //console.log(this.flight)
      this.showFlightDetails = true;
      this.loading = false;
    })
    .catch(
      err => {
        console.log(err)
        this.error = true;
        this.errorText = "Error while loading flight data!"
        this.loading = false;
      });
  }

  deleteThatReservation(constrollerName: string, actionName: string ,model: any) {
    this.loading = true;
    this.httpService.deleteAction(constrollerName, actionName, model).toPromise()
        .then(result => {
          this.change = true;
          this.loading = false;
          this.errorFFR = false;
        })
        .catch(
          err => {
            this.loading = false;
            console.log(err);
            this.errorFFR = true;
            this.errorText = "You can't delete that flight now!"
          });
  }

  cancelFastReservation(event) {
    const idDeleteFFR = event.target.id;
    this.deleteThatReservation("FastFlightReservation", "DeleteFFR", idDeleteFFR);
    
    // let ffr: FastFlightReservation = null;
    // for (let i = 0; i < this.allFastFlightReservation.length; ++i) {
    //   if (this.allFastFlightReservation[i].id == idDeleteFFR) {
    //     ffr = this.allFastFlightReservation[i];
    //     this.loading = true;
    //     this.httpService.getIdAction("Flight", ffr.flightId).toPromise()
    //       .then(result => {
    //         this.flight = (result as Flight);
    //         if (ffr != null) {
    //           // let date = new Date();
    //           // let deteOfFlight = new Date(this.flight.datumPolaska);
    //           // console.log("danasnja godina: " + date.getUTCFullYear());
    //           // console.log("danasnji mesec: " + date.getUTCMonth());
    //           // console.log("danasnji dan: " + date.getUTCDay());
    //           // console.log("danasnji sat: " + date.getUTCHours());
    //           // console.log("let godina: " + deteOfFlight.getUTCFullYear());
    //           // console.log("let mesec: " + deteOfFlight.getUTCMonth());
    //           // console.log("let dan: " + deteOfFlight.getUTCDay());
    //           // console.log("let sat: " + deteOfFlight.getUTCHours());
    //           // if (date.getFullYear() < deteOfFlight.getFullYear()) {
    //             // this.deleteThatReservation("FastFlightReservation", "DeleteFFR", idDeleteFFR);
    //           // }
    //           // if (date.getFullYear() == deteOfFlight.getFullYear()) {
    //           //   if (date.getMonth() < deteOfFlight.getMonth()) {
    //           //     this.deleteThatReservation("FastFlightReservation", "DeleteFFR", idDeleteFFR);
    //           //   }
    //           //   else if (date.getMonth() < deteOfFlight.getMonth()) {
    //           //     if (date.getDay() < deteOfFlight.getDay()) {
    //           //       this.deleteThatReservation("FastFlightReservation", "DeleteFFR", idDeleteFFR);
    //           //     }
    //           //     else if (date.getDay() == deteOfFlight.getDay()) {
    //           //       if (date.getHours() < deteOfFlight.getHours() - 3) {
    //           //         this.deleteThatReservation("FastFlightReservation", "DeleteFFR", idDeleteFFR);
    //           //       }
    //           //       else if (date.getHours() >= deteOfFlight.getHours() - 3) {
    //           //         this.errorFFR = true;
    //           //         this.errorText = "You can't that cancel flight!";
    //           //       }
    //           //     }
    //           //     else {
    //           //       this.errorFFR = true;
    //           //       this.errorText = "You can't that cancel flight!";
    //           //     }
    //           //   }
    //           //   else {
    //           //     this.errorFFR = true;
    //           //     this.errorText = "You can't that cancel flight!";
    //           //   }
    //           // }
    //           // else {
    //           //   this.errorFFR = true;
    //           //   this.errorText = "You can't that cancel flight!";
    //           // }
    //         }
    //         this.showFlightDetails = true;
    //         this.loading = false;
    //       })
    //       .catch(
    //         err => {
    //           console.log(err)
    //           this.error = true;
    //           this.errorText = "Error while loading flight data!"
    //           this.loading = false;
    //         });
        
    //     break;
    //   }
    // }
  }

  cancelReservation(event) {
    const idDeleteFR = event.target.id;
    this.deleteThatReservation("FlightReservation", "DeleteFR", idDeleteFR);
    // let ffr: FlightReservation = null;
    // for (let i = 0; i < this.allFlightReservation.length; ++i) {
    //   if (this.allFlightReservation[i].id == idDeleteFR) {
    //     ffr = this.allFlightReservation[i];
    //     this.loading = true;
    //     this.httpService.getIdAction("Flight", ffr.flightId).toPromise()
    //       .then(result => {
    //         this.flight = (result as Flight);
    //         if (ffr != null) {
    //           let date = new Date();
    //           let deteOfFlight = new Date(this.flight.datumPolaska);
    //           if (date.getFullYear() <= deteOfFlight.getFullYear()) {
    //             if (date.getMonth() <= deteOfFlight.getMonth()) {
    //               if (date.getDay() <= deteOfFlight.getDay()) {
    //                 let hours = deteOfFlight.getHours() - date.getHours();
    //                 if (hours > 3) {
    //                   this.errorFFR = false;
    //                   this.errorText = "";
    //                   this.httpService.deleteAction("FlightReservation", "DeleteFR", idDeleteFR).toPromise()
    //                       .then(result => {
    //                         this.change = true;
    //                       })
    //                       .catch(
    //                         err => {
    //                           console.log(err);
    //                           this.error = true;
    //                         });
    //                 }
    //                 else {
    //                   this.errorFFR = true;
    //                   this.errorText = "You can't that cancel flight!";
    //                 }
    //               }
    //               else {
    //                 this.errorFFR = true;
    //                 this.errorText = "You can't that cancel flight!";
    //               }
    //             }
    //             else {
    //               this.errorFFR = true;
    //               this.errorText = "You can't that cancel flight!";
    //             }
    //           }
    //           else {
    //             this.errorFFR = true;
    //             this.errorText = "You can't that cancel flight!";
    //           }
    //         }
    //         this.showFlightDetails = true;
    //         this.loading = false;
    //       })
    //       .catch(
    //         err => {
    //           console.log(err)
    //           this.error = true;
    //           this.errorText = "Error while loading flight data!"
    //           this.loading = false;
    //         });
        
    //     break;
    //   }
    // }
  }

  putFastFlightReservation(ffr: FastFlightReservation) {
    this.httpService.putAction('FastFlightReservation', ffr).subscribe (
      res => { 
        // this.successText = "";
        // this.success = true;
        this.error = false;
      },
      err => { 
        this.errorFFR = err; 
        this.error = true; 
        // this.success = false;
      });
  }

  putFlightReservation(fr: FlightReservation) {
    this.httpService.putAction('FlightReservation', fr).subscribe (
      res => { 
        // this.successText = "";
        // this.success = true;
        this.error = false;
      },
      err => { 
        this.errorFFR = err; 
        this.error = true; 
        // this.success = false;
      });
  }

  changeRate(event) {
    if (this.ocenaLeta > 0 || this.ocenaKompanije > 0) {
      const idChangeRateFFR = event.target.id;
    
      let ffr: FastFlightReservation = null;
      for (let i = 0; i < this.allFastFlightReservation.length; ++i) {
        if (this.allFastFlightReservation[i].id == idChangeRateFFR) {
          ffr = this.allFastFlightReservation[i];
          ffr.ocenaLeta = this.ocenaLeta;
          ffr.ocenaKompanije = this.ocenaKompanije;
          this.loading = true;
          this.httpService.getIdAction("Flight", ffr.flightId).toPromise()
            .then(result => {
              this.flight = (result as Flight);
              if (ffr != null) {
                let date = new Date();
                let deteOfFlight = new Date(this.flight.datumPolaska);
                if (date.getFullYear() > deteOfFlight.getFullYear()) {
                  this.putFastFlightReservation(ffr);
                  
                }
                else if (date.getFullYear() == deteOfFlight.getFullYear()) {
                  if (date.getMonth() > deteOfFlight.getMonth()) {
                    this.putFastFlightReservation(ffr);
                    
                  }
                  else if (date.getMonth() == deteOfFlight.getMonth()) {
                    if (date.getDay() > deteOfFlight.getDay()) {
                      this.putFastFlightReservation(ffr);
                      
                    }
                    else if (date.getDay() == deteOfFlight.getDay()) {
                      if (date.getHours() > deteOfFlight.getHours()) {
                        this.errorFFR = false;
                        this.errorText = "";
                        this.putFastFlightReservation(ffr);
                      }
                      else {
                        this.errorFFR = true;
                        this.errorText = "You can't rate now!";
                      }
                    }
                    else {
                      this.errorFFR = true;
                      this.errorText = "You can't rate now!";
                    }
                  }
                  else {
                    this.errorFFR = true;
                    this.errorText = "You can't rate now!";
                  }
                }
                else {
                  this.errorFFR = true;
                  this.errorText = "You can't rate now!";
                }
              }
              this.showFlightDetails = true;
              this.loading = false;
            })
            .catch(
              err => {
                console.log(err)
                this.error = true;
                this.errorText = "Error while loading flight data!"
                this.loading = false;
              });
          
          break;
        }
      }
    }
  }

  changeReservationRate(event) {
    if (this.ocenaLeta > 0 || this.ocenaKompanije > 0) {
      const idChangeRateFR = event.target.id;
    
      let fr: FlightReservation = null;
      for (let i = 0; i < this.allFlightReservation.length; ++i) {
        if (this.allFlightReservation[i].id == idChangeRateFR) {
          fr = this.allFlightReservation[i];
          fr.ocenaLeta = this.ocenaLeta;
          fr.ocenaKompanije = this.ocenaKompanije;
          this.loading = true;
          this.httpService.getIdAction("Flight", fr.flightId).toPromise()
            .then(result => {
              this.flight = (result as Flight);
              if (fr != null) {
                let date = new Date();
                let deteOfFlight = new Date(this.flight.datumPolaska);
                if (date.getFullYear() > deteOfFlight.getFullYear()) {
                  this.putFlightReservation(fr);
                  
                }
                else if (date.getFullYear() == deteOfFlight.getFullYear()) {
                  if (date.getMonth() > deteOfFlight.getMonth()) {
                    this.putFlightReservation(fr);
                    
                  }
                  else if (date.getMonth() == deteOfFlight.getMonth()) {
                    if (date.getDay() > deteOfFlight.getDay()) {
                      this.putFlightReservation(fr);
                      
                    }
                    else if (date.getDay() == deteOfFlight.getDay()) {
                      if (date.getHours() > deteOfFlight.getHours()) {
                        this.errorFFR = false;
                        this.errorText = "";
                        this.putFlightReservation(fr);
                      }
                      else {
                        this.errorFFR = true;
                        this.errorText = "You can't rate now!";
                      }
                    }
                    else {
                      this.errorFFR = true;
                      this.errorText = "You can't rate now!";
                    }
                  }
                  else {
                    this.errorFFR = true;
                    this.errorText = "You can't rate now!";
                  }
                }
                else {
                  this.errorFFR = true;
                  this.errorText = "You can't rate now!";
                }
              }
              this.showFlightDetails = true;
              this.loading = false;
            })
            .catch(
              err => {
                console.log(err)
                this.error = true;
                this.errorText = "Error while loading flight data!"
                this.loading = false;
              });
          
          break;
        }
      }
    }
  }
}
