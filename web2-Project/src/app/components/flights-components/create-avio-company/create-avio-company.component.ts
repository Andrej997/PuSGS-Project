import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { User } from 'src/app/entities/user/user';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Address } from 'src/app/entities/address/address';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { FlightDestination } from 'src/app/entities/flight-destination/flight-destination';
import { Flight } from 'src/app/entities/flight/flight';

@Component({
  selector: 'app-create-avio-company',
  templateUrl: './create-avio-company.component.html',
  styleUrls: ['./create-avio-company.component.css']
})
export class CreateAvioCompanyComponent implements OnInit {
  currentUser: User;

  logo: any;
  imgName: string;

  error: boolean = false;
  errorText: string = "";

  success: boolean = false;
  successText: string = "";

  flightCompany: FlightCompany;
  companyId: number = 0;

  constructor(public authenticationService: AuthenticationService,
    private route: ActivatedRoute, 
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
    this.imgName = "Choose image";
    this.route.params.subscribe(params => { this.companyId = params['id']; });
      if (this.companyId == undefined)
            this.companyId = -1;
      else {
        this.httpService.getIdAction("FlightCompany", this.companyId).toPromise()
          .then(result => {
            this.flightCompany = result as FlightCompany;
            console.log(this.flightCompany)
            this.form.setValue({
              company: this.flightCompany.name,
              promotionalDesc: this.flightCompany.promotionalDesc,
              streetAndNumber: this.flightCompany.address.streetAndNumber,
              city: this.flightCompany.address.city,
              country: this.flightCompany.address.country,
              logoImg: ""
            })
            this.form.controls["logoImg"].setValidators([]); //* menjamo validator za logo jer ne mora da ga menja
            this.form.controls["logoImg"].updateValueAndValidity(); //* promeni validator dinamicki
          })
          .catch(
            err => {
              console.log(err)
              this.error = true;
              this.errorText = "Error while loading company!"
            });
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

  destinations = new Array<string>();
  form = new FormGroup({
    company: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    promotionalDesc: new FormControl("", [Validators.required]),
    streetAndNumber: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    logoImg: new FormControl("", [Validators.required]),
  });
  
  get f(){
    return this.form.controls;
  }

  // destValues = new Map<string, string>();
  // onKey(event) {
  //   if (this.destValues.has(event.target.id)) {
  //     this.destValues[event.target.id] = event.target.value;
  //   }
  //   else {
  //     this.destValues.set(event.target.id, event.target.value);
  //   }
  // }
  // onChangeDestination(num: number){
  //   this.numOfDestinations = num;
  // }

  // createRange(number) {   // simulacija for petlje u html-u
  //   var items: number[] = [];
  //   for(var i = 0; i < number; i++){
  //      items.push(i);
  //   }
  //   return items;
  // }

  submit() {

    let companyName = this.form.value.company;
    let address = new Address(
      this.form.value.streetAndNumber,
      this.form.value.city,
      this.form.value.country
    );
    let promotionalDesc = this.form.value.promotionalDesc;
    
    

    let postFlightCompany = new FlightCompany(
      0,
      companyName,
      address,
      promotionalDesc,
      new Array<FlightDestination>(),
      new Array<Flight>(),
      this.logo,
      new Array<number>()
    );

    //this.currentUser.flightCompany = postFlightCompany;
    // postFlightCompany.admins.push(this.currentUser);

    //* ako ne postoji id, znaci da je u pitanju kreiranje companije
    if (this.companyId === -1) {
      this.httpService.postAction('FlightCompany', 'AddFC', postFlightCompany).subscribe(
        res => { 
          this.form.reset(); 
          this.successText = postFlightCompany.name;
          this.success = true;
          this.error = false;
          postFlightCompany = res as FlightCompany;
          postFlightCompany.admin = this.currentUser;
          this.httpService.putAction('FlightCompany', postFlightCompany).subscribe (
            res => { 
              this.successText = postFlightCompany.name + " changes ";
              this.success = true;
              this.error = false;
            },
            err => { 
              this.errorText = err; 
              this.error = true; 
              this.success = false;
            });
        },
        err => { 
          this.errorText = err; 
          this.error = true; 
          this.success = false;
        }
      );
    } //* posto postoji id znaci da je u pitanju menjenje podataka kompanije
    else {
      //! vracamo mu podatke koje je imao a koji se ne menjaju kroz ovu formu
      postFlightCompany.id = this.flightCompany.id;
      postFlightCompany.addressId = this.flightCompany.addressId;
      postFlightCompany.address.id = this.flightCompany.address.id;
      postFlightCompany.destinations = this.flightCompany.destinations;
      postFlightCompany.flights = this.flightCompany.flights;
      postFlightCompany.ocene = this.flightCompany.ocene;
      postFlightCompany.adminId = this.flightCompany.adminId;
      postFlightCompany.admin = this.flightCompany.admin
      if (postFlightCompany.logo == undefined)
        postFlightCompany.logo = this.flightCompany.logo;

      this.httpService.putAction('FlightCompany', postFlightCompany).subscribe (
        res => { 
          this.successText = postFlightCompany.name + " changes ";
          this.success = true;
          this.error = false;
        },
        err => { 
          this.errorText = err; 
          this.error = true; 
          this.success = false;
        });
    }
    
    
  }

  // imgPath: string;
  
  onImg(event) {
    const file = event.target.files[0];
    if (!file) {
      return false;
    }
    if (!file.type.match('image.*')) {
      return false;
    }
    const reader = new FileReader();
    const that = this;
    reader.onload = function (e) {
      that.logo = e.target.result;
      //console.log(that.logo);
    }
    reader.readAsDataURL(file);
  }
}
