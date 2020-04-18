import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';

@Component({
  selector: 'app-cc-flight',
  templateUrl: './cc-flight.component.html',
  styleUrls: ['./cc-flight.component.css']
})
export class CcFlightComponent implements OnInit {
  currentUser: User;
  flight: Flight;
  id: number;
  allCompanies: Array<string>;
  imgName : string;

  constructor(public authenticationService: AuthenticationService,
      private router: Router,
      private avioCompaniesService: AvioCompaniesService) { 
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
      if (this.currentUser.role != 1 && this.currentUser.role != 2) {
        this.kick();
      }
      else {
        this.allCompanies = avioCompaniesService.getAvioCompanyNames();
      }
    }
    else {
      this.kick();
    }
  }

  ngOnInit(): void {
    this.imgName = "Choose image";
  }

  // ako ne autorizovan ili ne ulogovan korisnik pokusa da pristupi
  // ovoj stranici
  private async kick() {
    await this.delay(3000);
    this.router.navigate(['/']);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  form = new FormGroup({
    company: new FormControl(),
    from: new FormControl(),
    to: new FormControl(),
    destImg: new FormControl(),
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    price: new FormControl(),
    vremePutovanja: new FormControl(),
    duzinaPutovanja: new FormControl(),
    presedanjeCnt: new FormControl(),
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    let companyName = this.form.value.company;
    let companyData = this.avioCompaniesService.getAvioCompanyData(companyName);
    console.log(companyData);
  }
}
