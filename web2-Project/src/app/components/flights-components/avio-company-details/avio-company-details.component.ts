import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';
import { User } from 'src/app/entities/user/user';
import { AvioSediste } from 'src/app/entities/avio-sediste/avio-sediste';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-avio-company-details',
  templateUrl: './avio-company-details.component.html',
  styleUrls: ['./avio-company-details.component.css']
})
export class AvioCompanyDetailsComponent implements OnInit {

  id: number;
  flightCompany: FlightCompany;
  currentUser: User;
  currentUserEmail = '';
  ocena: number;

  error: boolean = false;
  errorText: string = "";

  deleted: boolean = false;
  hideShowBTN: boolean = false;

  change: boolean = false;

  loading: boolean = true;

  noCompany: boolean = false;

  isMyCompany: boolean = false;

  constructor(private route: ActivatedRoute, private httpService: HttpServiceService,
        private avioCompaniesService: AvioCompaniesService, private router: Router,
        public authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentUserEmail = this.currentUser.email;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.id = params['id']; });
    //this.flightCompany = avioCompaniesService.getCompany(this.id);
    if (this.id == 0) {
      this.noCompany = true;
      this.loading = false;
    }
    else {
      this.httpService.getIdAction("FlightCompany", this.id).toPromise()
      .then(result => {
        this.flightCompany = result as FlightCompany;

        if (this.flightCompany.id == this.currentUser.serviceId) 
          this.isMyCompany = true;
          
        // console.log(this.flightCompany);
        
        this.ocena = 0;
        for (let index = 0; index < this.flightCompany.ocene.length; index++) {
          this.ocena += this.flightCompany.ocene[index].doubleValue;
          // console.log(this.flightCompany.ocene[index].doubleValue);
        }
        // console.log(this.ocena);
        if (this.flightCompany.ocene.length != 0)
          this.ocena = this.ocena / this.flightCompany.ocene.length;
        // console.log(this.ocena);
        // console.log(this.ocena);
        this.loading = false;
        //console.log(this.flightCompany);
      })
      .catch(
        err => {
          console.log(err)
          this.error = true;
          this.errorText = "Error while loading company!"
          this.loading = false;
        });
    }
  }

  // createRange(allSeats: Array<AvioSediste>) {   // simulacija for petlje u html-u
  //   //console.log(allSeats)
  //   let items: number[] = [];
  //   let retItem: number[] = [];
  //   for(var i = 0, j = 0; i < allSeats.length; i++){
  //     if (!allSeats[i].reserved && !allSeats[i].isFastReservation)
  //      items.push(++j);
  //   }
  //   retItem.push(items[items.length-1]);
  //   return retItem;
  // }

  hideShow() {
    if (!this.hideShowBTN)
      this.hideShowBTN = true;
    else this.hideShowBTN = false;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  private async kick() {
    await this.delay(3000);
    this.router.navigate(['/avio-companies']);
  }
  deleteEntity() {
    // this.deleted = true;
    // this.kick();
    this.loading = true;
    // console.log(this.loading)
    this.httpService.deleteAction("FlightCompany", "DeleteFlightCompany", this.id).toPromise()
    .then(result => {
      this.loading = false;
      this.deleted = true;
      this.kick();
    })
    .catch(
      err => {
        this.loading = false;
        console.log(err);
        this.error = true;
        this.hideShowBTN = false;
      });
      // console.log(this.loading)
  }

  refreshPage() {
    location.reload();
  }

  deleteFlightDestination(event) {
    const idDeleteFD = event.target.id;
    console.log(idDeleteFD)
    this.httpService.deleteAction("FlightDestination", "DeleteFlightDestination", idDeleteFD).toPromise()
    .then(result => {
      this.change = true;
    })
    .catch(
      err => {
        //console.log(err);
        this.error = true;
        this.hideShowBTN = false;
      });
  }

  deleteFlight(event) {
    const idDeleteF = event.target.id;
    this.httpService.deleteAction("Flight", "DeleteFlight", idDeleteF).toPromise()
    .then(result => {
      this.change = true;
    })
    .catch(
      err => {
        console.log(err);
        this.error = true;
        this.hideShowBTN = false;
      });
  }
}
