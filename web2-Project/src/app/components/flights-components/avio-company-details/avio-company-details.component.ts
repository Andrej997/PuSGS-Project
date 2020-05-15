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

  constructor(private route: ActivatedRoute, private httpService: HttpServiceService,
        private avioCompaniesService: AvioCompaniesService, private router: Router,
        public authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentUserEmail = this.currentUser.email;
    }
    route.params.subscribe(params => { this.id = params['id']; });
    //this.flightCompany = avioCompaniesService.getCompany(this.id);
    this.httpService.getIdAction("FlightCompany", this.id).toPromise()
    .then(result => {
      this.flightCompany = result as FlightCompany;
      this.ocena = 0;
      for (let index = 0; index < this.flightCompany.ocene.length; index++) {
        this.ocena += this.flightCompany.ocene[index];
      }
      if (this.flightCompany.ocene.length != 0)
        this.ocena = this.ocena / this.flightCompany.ocene.length;

      // console.log(this.ocena);

      console.log(this.flightCompany);
    })
    .catch(
      err => {
        console.log(err)
        this.error = true;
        this.errorText = "Error while loading company!"
      });
  }

  ngOnInit(): void {
  }

  createRange(allSeats: Array<AvioSediste>) {   // simulacija for petlje u html-u
    let items: number[] = [];
    let retItem: number[] = [];
    for(var i = 0, j = 0; i < allSeats.length; i++){
      if (!allSeats[i].reserved && !allSeats[i].isFastReservation)
       items.push(++j);
    }
    retItem.push(items[items.length-1]);
    return retItem;
  }

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
    this.httpService.deleteAction("FlightCompany", "DeleteFlightCompany", this.id).toPromise()
    .then(result => {
      this.deleted = true;
      this.kick();
    })
    .catch(
      err => {
        console.log(err);
        this.error = true;
        this.hideShowBTN = false;
      });
  }

  refreshPage() {
    location.reload();
  }

  deleteFlightDestination(event) {
    const idDeleteFD = event.target.id;
    this.httpService.deleteAction("FlightDestination", "DeleteFlightDestination", idDeleteFD).toPromise()
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
