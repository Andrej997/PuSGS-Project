import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';
import { User } from 'src/app/entities/user/user';

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

  constructor(private route: ActivatedRoute, 
        private avioCompaniesService: AvioCompaniesService,
        public authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentUserEmail = this.currentUser.email;
    }
    route.params.subscribe(params => { this.id = params['id']; });
    this.flightCompany = avioCompaniesService.getCompany(this.id);
    this.ocena = 0;
    for (let index = 0; index < this.flightCompany.ocene.length; index++) {
      this.ocena += this.flightCompany.ocene[index];
    }
    this.ocena = this.ocena / this.flightCompany.ocene.length;

    console.log(this.flightCompany);
  }

  ngOnInit(): void {
  }

}
