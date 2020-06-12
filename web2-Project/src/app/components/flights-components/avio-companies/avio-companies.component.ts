import { Component, OnInit } from '@angular/core';

import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-avio-companies',
  templateUrl: './avio-companies.component.html',
  styleUrls: ['./avio-companies.component.css']
})
export class AvioCompaniesComponent implements OnInit {
  currentUser: User;
  
  error: boolean = false;
  errorText: string = "";

  list: Array<FlightCompany>;

  loading: boolean = true;

  avioServiceId: number = 0;

  allAvioCompanies: Array<FlightCompany> = new Array<FlightCompany>();
  constructor(private avioCompaniesService: AvioCompaniesService,
              private httpService: HttpServiceService,
              public authenticationService: AuthenticationService) { 
    //this.allAvioCompanies = this.avioCompaniesService.loadAvioCompanies();
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;

      this.getUserAvioServiceId();
    }
  }

  getUserAvioServiceId() {
    this.httpService.getUserIdAction("FlightCompany/User", this.currentUser.id.toString()).toPromise()
    .then(result => {
      this.avioServiceId = result as number;

      if (this.avioServiceId > 0) {
        this.currentUser.serviceId = this.avioServiceId;
      }
    })
    .catch(
      err => {
        this.avioServiceId = 0;
        console.log(err);
      });
  }

  ngOnInit(): void {
    this.httpService.getAction('FlightCompany')
      .toPromise()
      .then(result => {
        this.allAvioCompanies = result as FlightCompany[];
        //console.log(this.allAvioCompanies);
        this.loading = false;
      })
      .catch(
        err => {
          console.log(err)
          this.error = true;
          this.errorText = "Error while loading companies!";
          this.loading = false;
        });
  }

  searchedCompanies(avioCompanies: Array<FlightCompany>) {
    this.loading = true;
    this.allAvioCompanies = avioCompanies;
    if (this.allAvioCompanies.length == 0) {
      this.error = true;
      this.errorText = "List is empty!";
      this.loading = false;
    }
    else {
      this.loading = false;
    }
  }
}
