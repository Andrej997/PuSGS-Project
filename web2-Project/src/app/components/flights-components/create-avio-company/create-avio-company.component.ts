import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { User } from 'src/app/entities/user/user';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Address } from 'src/app/entities/address/address';
import { HttpClient } from '@angular/common/http';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-create-avio-company',
  templateUrl: './create-avio-company.component.html',
  styleUrls: ['./create-avio-company.component.css']
})
export class CreateAvioCompanyComponent implements OnInit {
  currentUser: User;
  numOfDestinations: number;

  constructor(public authenticationService: AuthenticationService,
    private router: Router, private httpService: HttpServiceService,
    private avioCompaniesService: AvioCompaniesService) { 
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

  ngOnInit(): void {
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

  destinations = new Array<string>();
  form = new FormGroup({
    company: new FormControl("", [Validators.required]),
    promotionalDesc: new FormControl("", [Validators.required]),
    streetAndNumber: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    numdestinations: new FormControl(0, [Validators.min(0)]),
  });
  
  get f(){
    return this.form.controls;
  }
  destValues = new Map<string, string>();
  onKey(event) {
    if (this.destValues.has(event.target.id)) {
      this.destValues[event.target.id] = event.target.value;
    }
    else {
      this.destValues.set(event.target.id, event.target.value);
    }
  }
  onChangeDestination(num: number){
    this.numOfDestinations = num;
  }

  createRange(number) {   // simulacija for petlje u html-u
    var items: number[] = [];
    for(var i = 0; i < number; i++){
       items.push(i);
    }
    return items;
  }

  submit() {

    let companyName = this.form.value.company;
    let address = new Address(
      this.form.value.streetAndNumber,
      this.form.value.city,
      this.form.value.country
    );
    let promotionalDesc = this.form.value.promotionalDesc;

    let body = {
      companyName,
      address,
      promotionalDesc,
    }

    // this.httpService.postAction('FlightCompany', 'AddFlightCompany', body).subscribe(
    //   res => { this.form.reset(); },
    //   err => { console.log(err); }
    // );

    for (let i = 0; i < this.numOfDestinations; ++i) {
      console.log(this.destValues['d'+i]);
    }
  }

}
