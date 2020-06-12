import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { User } from 'src/app/entities/user/user';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';
import { Flight } from 'src/app/entities/flight/flight';
import { FlightReservation } from 'src/app/entities/flight-reservation/flight-reservation';
import { FastFlightReservation } from 'src/app/entities/fast-flight-reservation/fast-flight-reservation';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  flightCompany: FlightCompany;
  flight: Flight;
  flights: Array<Flight> = new Array<Flight>();

  ocena: number = 0;
  currentUser: User;

  error: boolean = false;
  errorText: string = "";
  loading: boolean = true;

  show: boolean = false;
  
  constructor(public authenticationService: AuthenticationService,
    private router: Router, private httpService: HttpServiceService,
    private avioCompaniesService: AvioCompaniesService) { 
      if (this.authenticationService.currentUserValue) { 
        this.currentUser = this.authenticationService.currentUserValue;
        if (this.currentUser.role != 1 && this.currentUser.role != 2 && this.currentUser.role != 3) {
          this.kick();
        }
      }
      else {
        this.kick();
      }
  }

  private async kick() {
    await this.delay(3000);
    this.router.navigate(['/log-in']);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  ngOnInit(): void {
    this.httpService.getIdAction("FlightCompany", this.currentUser.serviceId).toPromise()
      .then(result => {
        this.flightCompany = result as FlightCompany;

        this.flightCompany.flights.forEach(element => {
          this.loadFlights(element.id);
        });
          
        console.log(this.flightCompany);
        
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
        // this.loading = false;
        this.show = true;
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

  index: number = 0;
  loadFlights(id) {
    this.loading = true;
    this.httpService.getIdAction("Flight", id).toPromise()
    .then(result => {
      this.flight = result as Flight;
      
      let ocena = 0;
      for (let index = 0; index < this.flight.ocene.length; index++) {
        ocena += this.flight.ocene[index].doubleValue;
      }
      if (this.flight.ocene.length != 0)
        ocena = ocena / this.flight.ocene.length;

      // console.log(this.ocena);

      this.flights.push(this.flight);
      ++this.index;
      this.loading = false;
      console.log(this.flight);
    })
    .catch(
      err => {
        console.log(err)
        this.error = true;
        this.errorText = "Error while loading flight data!"
        this.loading = false;
      });
  }

  ocenaL: number = 0;
  showData: boolean = false;
  dnevne: number = 0;
  mesecne: number = 0;
  godisnje: number = 0;
  zadaraZaTajLet: number = 0;
  getDate(event) {
    let id: number = Number.parseInt(event.target.id)
    // console.log("ulazni event -> " + id);
    for (let f = 0; f < this.flights.length; ++f) {
      // console.log("this.flights[f].id -> " + this.flights[f].id);
      // console.log("event -> " + id);
      if (this.flights[f].id == id) {
        this.flight = this.flights[f];
        break;
      }
    }
    this.ocenaL = 0;
      for (let index = 0; index < this.flight.ocene.length; index++) {
        this.ocenaL += this.flight.ocene[index].doubleValue;
      }
      if (this.flight.ocene.length != 0)
      this.ocenaL = this.ocenaL / this.flight.ocene.length;
    this.dnevne = 0;
    this.mesecne = 0;
    this.godisnje = 0;
    this.zadaraZaTajLet = 0;
    this.loading = true;
    //onsole.log(event.target.id)
    let flightReservation: Array<FlightReservation> = new Array<FlightReservation>();
    
    this.httpService.getIdAction("FlightReservation/Statistics", id).toPromise()
    .then(result => {
      flightReservation = result as FlightReservation[];

      let dateInput = new Date(event.target.value);
      flightReservation.forEach(element => {
        let dateTemp = new Date(element.dateNow); //* dan kad je kreirana rezervacija
        if (dateInput.getDay() == dateTemp.getDay() && dateInput.getMonth() == dateTemp.getMonth() && dateInput.getFullYear() == dateTemp.getFullYear()) {
          ++this.dnevne;
        }
        if (dateInput.getMonth() == dateTemp.getMonth() && dateInput.getFullYear() == dateTemp.getFullYear()) {
          ++this.mesecne;
        }
        if (dateInput.getFullYear() == dateTemp.getFullYear()) {
          ++this.godisnje;
        }
        this.zadaraZaTajLet += element.price;
      });

      this.showData = true;
      this.loading = false;
    })
    .catch(
      err => {
        console.log(err)
        this.error = true;
        this.errorText = "Error while loading flight reservation!"
        this.loading = false;
      });
    let fastFlightReservation: Array<FastFlightReservation> = new Array<FastFlightReservation>();
    this.httpService.getIdAction("FastFlightReservation/Statistics", id).toPromise()
    .then(result => {
      fastFlightReservation = result as FastFlightReservation[];

      let dateInput = new Date(event.target.value);
      fastFlightReservation.forEach(element => {
        let dateTemp = new Date(element.dateNow); //* dan kad je kreirana rezervacija
        if (dateInput.getDay() == dateTemp.getDay() && dateInput.getMonth() == dateTemp.getMonth() && dateInput.getFullYear() == dateTemp.getFullYear()) {
          ++this.dnevne;
        }
        if (dateInput.getMonth() == dateTemp.getMonth() && dateInput.getFullYear() == dateTemp.getFullYear()) {
          ++this.mesecne;
        }
        if (dateInput.getFullYear() == dateTemp.getFullYear()) {
          ++this.godisnje;
        }

        this.zadaraZaTajLet += element.price;
      });

      this.showData = true;
      this.loading = false;
    })
    .catch(
      err => {
        console.log(err)
        this.error = true;
        this.errorText = "Error while loading flight reservation!"
        this.loading = false;
      });
  }
}
