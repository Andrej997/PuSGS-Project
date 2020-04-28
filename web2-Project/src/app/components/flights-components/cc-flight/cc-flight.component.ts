import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { Presedanje } from 'src/app/entities/flight-presedanje/presedanje';

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

  values = 0;
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  show4: boolean = false;
  show5: boolean = false;

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
    company: new FormControl([Validators.required]),
    from: new FormControl('',[Validators.required]),
    to: new FormControl('',[Validators.required]),
    destImg: new FormControl("",[Validators.required]),
    dateFrom: new FormControl([Validators.required]),
    dateTo: new FormControl([Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    vremePutovanja: new FormControl([Validators.required]),
    duzinaPutovanja: new FormControl(0, [Validators.required, Validators.min(1)]),
    presedanjeCnt: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
    presedanje1: new FormControl('city',[Validators.required]),
    presedanje2: new FormControl('city',[Validators.required]),
    presedanje3: new FormControl('city',[Validators.required]),
    presedanje4: new FormControl('city',[Validators.required]),
    presedanje5: new FormControl('city',[Validators.required]),
  });
  
  get f(){
    return this.form.controls;
  }

  onKey(event: any) { // without type info
    this.values = event.target.value;
    if (this.values == 1) {
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.show5 = false;
    }
    else if (this.values == 2) {
      this.show1 = true;
      this.show2 = true;
      this.show3 = false;
      this.show4 = false;
      this.show5 = false;
    }
    else if (this.values == 3) {
      this.show1 = true;
      this.show2 = true;
      this.show3 = true;
      this.show4 = false;
      this.show5 = false;
    }
    else if (this.values == 4) {
      this.show1 = true;
      this.show2 = true;
      this.show3 = true;
      this.show4 = true;
      this.show5 = false;
    }
    else if (this.values == 5) {
      this.show1 = true;
      this.show2 = true;
      this.show3 = true;
      this.show4 = true;
      this.show5 = true;
    }
    else {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.show5 = false;
    }
  }
  
  submit(){

    let companyName = this.form.value.company;
    let companyData = this.avioCompaniesService.getAvioCompanyData(companyName);
    let dateFrom = this.form.value.dateFrom;
    let dateTo =  this.form.value.dateTo;

    let allChangeovers = new Array<string>();
    if (this.form.value.presedanje1 != 'city') {
      allChangeovers.push(this.form.value.presedanje1);
    }
    if (this.form.value.presedanje2 != 'city') {
      allChangeovers.push(this.form.value.presedanje2);
    }
    if (this.form.value.presedanje3 != 'city') {
      allChangeovers.push(this.form.value.presedanje3);
    }
    if (this.form.value.presedanje4 != 'city') {
      allChangeovers.push(this.form.value.presedanje4);
    }
    if (this.form.value.presedanje5 != 'city') {
      allChangeovers.push(this.form.value.presedanje5);
    }

    // let newFlight = new Flight(
    //   companyData[1],
    //   companyName,
    //   companyData[0],
    //   companyData[2],
    //   this.form.value.from,
    //   this.form.value.to,
    //   this.form.value.destImg,
    //   this.form.value.dateFrom,
    //   this.form.value.dateTo,
    //   this.form.value.price,
    //   this.form.value.vremePutovanja,
    //   this.form.value.duzinaPutovanja,
    //   new Presedanje(
    //     this.form.value.presedanjeCnt,
    //     allChangeovers
    //   )
    // );
    // this.avioCompaniesService.saveNewFlight(companyData[0], newFlight);
  }
}
