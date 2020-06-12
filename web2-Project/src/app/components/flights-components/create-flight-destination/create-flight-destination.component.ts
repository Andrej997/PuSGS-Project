import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from 'src/app/entities/address/address';
import { FlightDestination } from 'src/app/entities/flight-destination/flight-destination';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';

@Component({
  selector: 'app-create-flight-destination',
  templateUrl: './create-flight-destination.component.html',
  styleUrls: ['./create-flight-destination.component.css']
})
export class CreateFlightDestinationComponent implements OnInit {
  currentUser: User;
  companyId: number;
  flightCompany: FlightCompany;
  flightDestinationId: number;
  flightDestination: FlightDestination;
  id1: number;
  id2: number;

  flightPOST_PUT: FlightDestination;

  error: boolean = false;
  errorText: string = "";

  success: boolean = false;
  successText: string = "";

  loading: boolean = false;

  constructor(public authenticationService: AuthenticationService,
    private route: ActivatedRoute, 
    private router: Router, private httpService: HttpServiceService) { 
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
    this.loading = true;
    this.route.params.subscribe(params => { this.companyId = params['idC']; });
    this.httpService.getIdAction("FlightCompany", this.companyId).toPromise()
      .then(result => {
        this.flightCompany = result as FlightCompany;
        this.loading = false;
      })
      .catch(
        err => {
          this.loading = false
          console.log(err)
          this.error = true;
          this.errorText = "Error while loading company!"
        });
    this.loading = true;
    this.route.params.subscribe(params => { this.flightDestinationId = params['idFD']; });
    if (this.flightDestinationId == undefined) {
      this.flightDestinationId = -1;
      this.loading = false;
    }
    else {
      this.httpService.getIdAction("FlightDestination", this.flightDestinationId).toPromise()
        .then(result => {
          this.flightDestination = result as FlightDestination;
          // console.log(this.flightDestination);
          this.id1 = this.flightDestination.startAddress.id;
          this.id2 = this.flightDestination.endAddress.id;
          this.flightPOST_PUT = this.flightDestination;
          // console.log(this.flightPOST_PUT);
          this.form.setValue({
            streetAndNumber1: this.flightDestination.startAddress.streetAndNumber,
            city1: this.flightDestination.startAddress.city,
            country1: this.flightDestination.startAddress.country,
            streetAndNumber2: this.flightDestination.endAddress.streetAndNumber,
            city2: this.flightDestination.endAddress.city,
            country2: this.flightDestination.endAddress.country
          })
          this.loading = false
        })
        .catch(
          err => {
            this.loading = false
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

  form = new FormGroup({
    streetAndNumber1: new FormControl("", [Validators.required]),
    city1: new FormControl("", [Validators.required]),
    country1: new FormControl("", [Validators.required]),
    streetAndNumber2: new FormControl("", [Validators.required]),
    city2: new FormControl("", [Validators.required]),
    country2: new FormControl("", [Validators.required])
  });

  get f(){
    return this.form.controls;
  }

  submit() {
    this.loading = true;
    let address1 = new Address(
      this.form.value.streetAndNumber1,
      this.form.value.city1,
      this.form.value.country1
    );
    let address2 = new Address(
      this.form.value.streetAndNumber2,
      this.form.value.city2,
      this.form.value.country2
    );

    if (address1.city === address2.city) {
      this.error = true;
      this.errorText = "Cities can't be the same!";

      if (address1.streetAndNumber === address2.streetAndNumber) {
        this.error = true;
        this.errorText += " Street name and number can't be the same!";
      }
    }

    if (this.validate(address1, address2)) {
      this.error = false;
      let flightDestination = new FlightDestination(address1, address2);
      if (this.flightDestinationId == -1) {
        flightDestination.companyId = this.flightCompany.id;
        this.flightCompany.destinations.push(flightDestination);
        this.httpService.postAction('FlightDestination', 'AddFD', flightDestination).subscribe (
          res => { 
            this.form.reset();
            this.successText = "!";
            this.success = true;
            this.error = false;
            this.loading = false
          },
          err => { 
            this.loading = false
            this.errorText = err; 
            this.error = true; 
            this.success = false;
          });
      }
      else {
        this.flightPOST_PUT.startAddress = flightDestination.startAddress;
        this.flightPOST_PUT.endAddress = flightDestination.endAddress;
        this.flightPOST_PUT.startAddress.id= this.id1;
        this.flightPOST_PUT.endAddress.id = this.id2;
        // flightDestination.id = this.flightDestination.id;
        // flightDestination.startAddress.id = this.flightDestination.startAddress.id;
        // flightDestination.endAddress.id = this.flightDestination.endAddress.id;
        // console.log(this.flightPOST_PUT);
        this.httpService.putAction('FlightDestination', this.flightPOST_PUT).subscribe(
          res => { 
            this.loading = false
            this.successText = " changes ";
            this.success = true;
            this.error = false;
          },
          err => { 
            this.loading = false
            this.errorText = err; 
            this.error = true; 
            this.success = false;
          });
      }
    }
    else {
      this.loading = false
      this.error = true;
    }
    
  }

  private validate (address1: Address, address2: Address): boolean {
    if (address1.city === address2.city) {
      this.errorText = "Cities can't be the same!";
      
      if (address1.streetAndNumber === address2.streetAndNumber) {
        this.error = true;
        this.errorText += " Streetname and number can't be the same!";
      }
      return false;
    }

    if (address1.streetAndNumber === address2.streetAndNumber) {
      this.errorText = "Streetname and number can't be the same!";
      return false;
    }

    return true;
  }
}
