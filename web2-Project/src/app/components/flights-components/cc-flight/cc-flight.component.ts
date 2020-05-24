import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { Presedanje } from 'src/app/entities/flight-presedanje/presedanje';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';
import { FlightDestination } from 'src/app/entities/flight-destination/flight-destination';
import { Aeroplane } from 'src/app/entities/aeroplane/aeroplane';
import { AvioLuggage } from 'src/app/entities/avio-luggage/avio-luggage';
import { StringForICollection } from 'src/app/entities/StringForICollection/string-for-icollection';
import { AvioSediste } from 'src/app/entities/avio-sediste/avio-sediste';

@Component({
  selector: 'app-cc-flight',
  templateUrl: './cc-flight.component.html',
  styleUrls: ['./cc-flight.component.css']
})
export class CcFlightComponent implements OnInit {
  currentUser: User;
  flight: Flight;
  id: number;
  allAvioCompanies: Array<FlightCompany> = new Array<FlightCompany>();
  imgName : string;
  flightCompany: FlightCompany;
  companyID: number = -1;
  oneCompany: boolean = false;
  oneCompanyName: string = "";

  destinationForPP: FlightDestination; //* destinacija za slanje

  //* array of flight destinations of a choosen flight company!
  fdofc: Array<FlightDestination> = new Array<FlightDestination>();
  choosenFD: FlightDestination;

  error: boolean = false;
  errorText: string = "";

  success: boolean = false;
  successText: string = "";

  values = 0;
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  show4: boolean = false;
  show5: boolean = false;

  logo: string = "";
  destImg;

  allAeroplanes: Array<Aeroplane> = new Array<Aeroplane>();

  numOfFastReseravtions: number = 0;

  constructor(public authenticationService: AuthenticationService,
      private route: ActivatedRoute,
      private router: Router, private httpService: HttpServiceService,
      private avioCompaniesService: AvioCompaniesService) { 
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
      if (this.currentUser.role != 1 && this.currentUser.role != 2) {
        this.kick();
      }
      else {
        route.params.subscribe(params => { this.companyID = params['idC']; });

        if (this.companyID != -1 && this.companyID != 0) {
          this.oneCompany = true;
          //* ako je pristupio ovoj stranici iz aviocompany details
          this.httpService.getIdAction("FlightCompany", this.companyID).toPromise()
          .then(result => {
            this.flightCompany = result as FlightCompany;
            this.oneCompanyName = this.flightCompany.name;
            this.logo = this.flightCompany.logo;
            this.fdofc = this.flightCompany.destinations;
            
          })
          .catch(
            err => {
              console.log(err)
              this.error = true;
              this.errorText = "Error while loading company!"
            });
        }
        else if (this.companyID == 0) {
          this.oneCompany = false;
          //* vrati mi sve kompanije
          this.httpService.getAction('FlightCompany')
          .toPromise()
          .then(result => {
            this.allAvioCompanies = result as FlightCompany[];
            // console.log(this.allAvioCompanies);
            //console.log(this.fdofc);
          })
          .catch(
            err => {
              console.log(err)
              this.error = true;
              this.errorText = "Error while loading companies!"
            });
        }
      }
    }
    else {
      this.kick();
    }
  }

  ngOnInit(): void {
    this.imgName = "Choose end destination image";

    this.httpService.getAction('Plane')
      .toPromise()
      .then(result => {
        this.allAeroplanes = result as Aeroplane[];
        //console.log(this.allAeroplanes);
      })
      .catch(
        err => {
          console.log(err)
          this.error = true;
          this.errorText = "Error while loading aeroplanes!"
        });

    // this.httpService.getIdAction('Flight', 3)
    //   .toPromise()
    //   .then(result => {
    //     //this.allAeroplanes = result as Aeroplane[];
    //     //console.log(this.allAeroplanes);
    //   })
    //   .catch(
    //     err => {
    //       console.log(err)
    //       this.error = true;
    //       this.errorText = "Error while loading aeroplanes!"
    //       });
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
    company: new FormControl([Validators.required]),
    plane: new FormControl([Validators.required]),
    destinations: new FormControl([Validators.required]),
    destImg: new FormControl("",[Validators.required]),
    dateFrom: new FormControl([Validators.required]),
    dateTo: new FormControl([Validators.required]),
    price: new FormControl([Validators.required, Validators.min(1)]),
    pricetw: new FormControl([Validators.required, Validators.min(1)]),
    vremePutovanjass: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(59)]),
    vremePutovanjamm: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(59)]),
    vremePutovanjahh: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(99)]),
    duzinaPutovanja: new FormControl([Validators.required, Validators.min(1)]),
    presedanjeCnt: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
    presedanje1: new FormControl('city',[Validators.required]),
    presedanje2: new FormControl('city',[Validators.required]),
    presedanje3: new FormControl('city',[Validators.required]),
    presedanje4: new FormControl('city',[Validators.required]),
    presedanje5: new FormControl('city',[Validators.required]),
    priceCarryOn: new FormControl(0, [Validators.required, Validators.min(0)]),
    pricePersonalBag: new FormControl(0,[Validators.required, Validators.min(0)]),
    priceFullSizeSpinner: new FormControl(0, [Validators.required, Validators.min(0)]),
    priceLargeDuffel: new FormControl(0, [Validators.required, Validators.min(0)]),
    numOfFastReseravtions: new FormControl(0, [Validators.required, Validators.min(0)]),
    discountForFastReservation: new FormControl(0, [Validators.required, Validators.min(0)])
  });
  
  get f(){
    return this.form.controls;
  }

  onChange(id: number) {
    for (let i = 0; i < this.allAvioCompanies.length; ++i) {
      if (this.allAvioCompanies[i].id == id) {
        this.logo = this.allAvioCompanies[i].logo;
        this.fdofc = this.allAvioCompanies[i].destinations;
        this.flightCompany = this.allAvioCompanies[i];
        // console.log(this.allAvioCompanies[i])
        break;
      }
    }
  }

  
  onChangeFD(eventId: number) {
    //console.log("ID " + eventId);
    for (let i = 0; i < this.fdofc.length; ++i) {
      if (this.fdofc[i].id == eventId) {
        this.destinationForPP = this.fdofc[i];
        break;
      }
    }
  }

  numOfChosenPlaneSeats: number = 0;
  choseenPlane: Aeroplane;
  onChangePlane(eventId: number) {
    for (let i = 0; i < this.allAeroplanes.length; ++i) {
      if (this.allAeroplanes[i].id == eventId) {
        this.choseenPlane = this.allAeroplanes[i];
        this.numOfChosenPlaneSeats = this.choseenPlane.numSeats;
        break;
      }
    }
  }

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
      that.destImg = e.target.result;
      //console.log(that.destImg);
    }
    reader.readAsDataURL(file);
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
  
  private compareDates(fd: Date, ld: Date): boolean {
    if (fd.getTime() === ld.getTime()) {
      this.error = true;
      this.errorText = "Flight date and landing date can't be the same!";
      return false;
    }
    else if (fd.getTime() > ld.getTime()) {
      this.error = true;
      this.errorText = "Landing date must be greather thant flight date!";
      return false;
    }
    else {
      this.error = false;
      this.errorText = "";
      return true;
    }
  }


  destValues = new Map<string, number>();
  onKeySid(event) {
    if (this.destValues.has(event.target.id)) {
      this.destValues[event.target.id] = event.target.value;
    }
    else {
      this.destValues.set(event.target.id, event.target.value);
    }
    // this.destValues.forEach(element => {
    //   console.log(element);
    // });
  }
  onChangeAddFRF(num: number){
    this.numOfFastReseravtions = num;
    //console.log(this.numOfFastReseravtions + ' = ' + num);
  }

  createRange(number) {   // simulacija for petlje u html-u
    // console.log(number);
    var items: number[] = [];
    for(var i = 0; i < number; i++){
       items.push(i);
    }
    // console.log(items);
    return items;
  }

  submit() {
    let send: boolean;

    //#region date
    let fdInput = this.form.value.dateFrom;
    let fd = new Date(fdInput);
    let ldInput = this.form.value.dateTo;
    let ld = new Date(ldInput);
    if (isNaN(fd.getTime()) || isNaN(ld.getTime())) {
      this.error = true;
      this.errorText = "Invalid date input!";
    } 
    else {
      this.error = false;
      send = this.compareDates(fd, ld);
    }
    //#endregion

    //#region luggage
    let avioLuggage = new AvioLuggage();
    avioLuggage.priceCarryOn = this.form.value.priceCarryOn;
    avioLuggage.priceFullSizeSpinner = this.form.value.priceFullSizeSpinner;
    avioLuggage.priceLargeDuffel = this.form.value.priceLargeDuffel;
    avioLuggage.pricePersonalBag = this.form.value.pricePersonalBag;
    //#endregion

    if (this.form.value.numOfFastReseravtions < 0) send = false;
    if (this.form.value.discountForFastReservation < 0) send = false;

    //#region JEDAN VEOMA RUZAN KOD, ALI FUNKCIONALAN ZA PROVERU IMENA GRADOVA PRESEDANJA
    let presedanje: Presedanje;
    let chNum = this.form.value.presedanjeCnt;
    if (chNum > 0) {
      let chCitiesGood = Array<boolean>(chNum);
      let allChangeovers = new Array<StringForICollection>();
      if (this.form.value.presedanje1 != 'city' && chNum <= 1) {
        let sfic = new StringForICollection();
        sfic.id = 0;
        sfic.PlainString = this.form.value.presedanje1;
        allChangeovers.push(sfic);
        chCitiesGood[0]= true;
      }
      else if (this.form.value.presedanje1 == 'city' && chNum <= 1) {
        chCitiesGood[0]= false;
        this.error = true;
        this.errorText = "Changeover city can't be named 'city'!";
      }
  
      if (this.form.value.presedanje2 != 'city' && chNum <= 2) {
        let sfic = new StringForICollection();
        sfic.id = 0;
        sfic.PlainString = this.form.value.presedanje2;
        allChangeovers.push(sfic);
        chCitiesGood[1]= true;
      }
      else if (this.form.value.presedanje2 == 'city' && chNum <= 2) {
        chCitiesGood[1]= false;
        this.error = true;
        this.errorText = "Changeover city can't be named 'city'!";
      }
  
      if (this.form.value.presedanje3 != 'city' && chNum <= 3) {
        let sfic = new StringForICollection();
        sfic.id = 0;
        sfic.PlainString = this.form.value.presedanje3;
        allChangeovers.push(sfic);
        chCitiesGood[2]= true;
      }
      else if (this.form.value.presedanje3 == 'city' && chNum <= 3) {
        chCitiesGood[2]= false;
        this.error = true;
        this.errorText = "Changeover city can't be named 'city'!";
      }
  
      if (this.form.value.presedanje4 != 'city' && chNum <= 4) {
        let sfic = new StringForICollection();
        sfic.id = 0;
        sfic.PlainString = this.form.value.presedanje4;
        allChangeovers.push(sfic);
        chCitiesGood[3]= true;
      }
      else if (this.form.value.presedanje4 == 'city' && chNum <= 4) {
        chCitiesGood[3]= false;
        this.error = true;
        this.errorText = "Changeover city can't be named 'city'!";
      }
  
      if (this.form.value.presedanje5 != 'city' && chNum <= 5) {
        let sfic = new StringForICollection();
        sfic.id = 0;
        sfic.PlainString = this.form.value.presedanje5;
        allChangeovers.push(sfic);
        chCitiesGood[4]= true;
      }
      else if (this.form.value.presedanje5 == 'city' && chNum <= 5) {
        chCitiesGood[4]= false;
        this.error = true;
        this.errorText = "Changeover city can't be named 'city'!";
      }
  
      for (let i = 0; i < chNum; ++i) {
        if (chCitiesGood[i] == false) {
          break;
        }
        if (i === chNum - 1) {
          this.error = false;
        }
      }
      presedanje = new Presedanje(chNum, allChangeovers);
    }
    else {
      let allChangeovers = new Array<StringForICollection>();
      let stringForICollection = new StringForICollection();
      stringForICollection.PlainString = "NONE";
      allChangeovers.push(stringForICollection);
      presedanje = new Presedanje(chNum, allChangeovers);
    }
    presedanje.id = 0;
    //#endregion

    let price: number = this.form.value.price;
    let pricetw: number = this.form.value.pricetw;
    let duzinaPutovanja: number = this.form.value.duzinaPutovanja;
    this.numOfFastReseravtions = this.form.value.numOfFastReseravtions;
    let discountForFastReservation: number = this.form.value.discountForFastReservation;

    this.flight = new Flight(0, 
      this.flightCompany.name,
      this.flightCompany.id,
      this.flightCompany.logo,
      this.destinationForPP.startAddress,
      this.destinationForPP.endAddress,
      this.destImg,
      fd,
      ld,
      price,
      pricetw,
      this.form.value.vremePutovanjahh + ":" 
        + this.form.value.vremePutovanjamm + ":" 
        + this.form.value.vremePutovanjass,
      duzinaPutovanja,
      presedanje,
      // new Presedanje(0, new Array<string>()),
      this.choseenPlane,
      avioLuggage
      );

      this.flight.numOfFastReseravtions = this.numOfFastReseravtions;
      if (this.numOfFastReseravtions > this.choseenPlane.numSeats) send = false;
      this.flight.discountForFastReservation = discountForFastReservation;

      let allSeats: Array<AvioSediste> = new Array<AvioSediste>();
      for (let i = 0; i < this.choseenPlane.numSeats; ++i) {
        let seat = new AvioSediste(0, false, false);
        allSeats.push(seat);
      }
      for (let i = 0; i < this.choseenPlane.numSeats; ++i) {
        this.destValues.forEach(element => {
          //console.log(element);
          if(element == i + 1) {
            allSeats[i].isFastReservation = true;
          }
        });
      }
      this.flight.allSeatsForThisFlight = allSeats;

      //console.log(this.flight);

      if (send === false) {
        this.error = true;
      }
      else {
        this.error = false;
        this.httpService.postAction('Flight', 'AddF', this.flight).subscribe(
          res => { 
            this.form.reset(); 
            this.successText = "Flight created!";
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
}
