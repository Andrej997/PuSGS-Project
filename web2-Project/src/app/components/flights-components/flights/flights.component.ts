import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { FlightsService } from 'src/app/services/flights-service/flights.service';
//import { trigger, state, style, transition, animate } from '@angular/animations'


import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { User } from 'src/app/entities/user/user';
import { SearchFlight } from 'src/app/entities/search-flight/search-flight';
import { FilterFlight } from 'src/app/entities/filter-flight/filter-flight';
import { AvioSediste } from 'src/app/entities/avio-sediste/avio-sediste';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']/*,
  animations:[
    trigger('myTrigger',[
      state('fadeIn', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({ opacity: '0', transform: 'translateY(200px)'}),
        animate('5000ms')
      ])
    ])
  ]*/
})
export class FlightsComponent implements OnInit {
  //state: string = 'fadeIn';
  currentUser: User;
  searchedBool: boolean;
  filteredBool: boolean;

  loading: boolean = true;

  newId: number; // broj koji se dodeljuje automatski pri kreiranju novog leta

  allFlights: Array<Flight>;
  allFlightsCopy: Array<Flight>; // jer ne postoji baza trenutno

  error: boolean = false;
  errorText: string = "";

  constructor(
      private flightsService: FlightsService,
      public authenticationService: AuthenticationService,
      private avioCompaniesService: AvioCompaniesService,
      private httpService: HttpServiceService) {
        if (this.authenticationService.currentUserValue) { 
          this.currentUser = this.authenticationService.currentUserValue;
        }
      // this.allFlights = avioCompaniesService.getAllFligths();
      // this.allFlightsCopy = this.allFlights;
      //console.log(this.allFlights);
      //this.allFlights = this.flightsService.loadFlights();
   }

  ngOnInit(): void {
    this.httpService.getAction('Flight')
      .toPromise()
      .then(result => {
        this.allFlights = result as Flight[];
        this.allFlightsCopy = this.allFlights;
        console.log(this.allFlights);
        this.loading = false;
      })
      .catch(
        err => {
          console.log(err)
          this.error = true;
          this.errorText = "Error while loading flights!"
          this.loading = false;
        });
    this.searchedBool = false;
    this.filteredBool = false;
  }

  cancelSearch(){
    this.searchedBool = false;
    this.filteredBool = false;
    this.allFlights = this.allFlightsCopy;
  }

  search(searchFlights: SearchFlight): void {
    this.searchedBool = true;
    let searchedArray = new Array<Flight>();

    if (this.filteredBool === false) {
      this.allFlights = this.allFlightsCopy;
      searchedArray = this.searchThrueArray(this.allFlights, searchFlights);
    }
    else {
      searchedArray = this.searchThrueArray(this.allFlights, searchFlights);
    }
    
    if (searchedArray.length > 0) {
      this.allFlights = searchedArray;
    }
  }

  private searchThrueArray(array: Array<Flight>, searchFlights: SearchFlight): Array<Flight>{
    let searched = new Array<Flight>();
    if (searchFlights.selectType == 1) { // ako je po kompanijama
      array.forEach(element => {
        if (element.company === searchFlights.inputSearch) { // ako postoji ta kompanija
          searched.push(element);
        }
      });
    }
    else if (searchFlights.selectType == 2) { // ako je po gradu polaska
      array.forEach(element => {
        if (element.from.city === searchFlights.inputSearch) { // ako postoji ta kompanija
          searched.push(element);
        }
      });
    }
    else if (searchFlights.selectType == 3) { // ako je po gradu sletanja
      array.forEach(element => {
        if (element.to.city === searchFlights.inputSearch) { // ako postoji ta kompanija
          searched.push(element);
        }
      });
    }
    return searched;
  }

  filter(filterFlight: FilterFlight): void {
    this.filteredBool = true;
    
    let filteredArray = new Array<Flight>();

    if (this.searchedBool === false) {
      this.allFlights = this.allFlightsCopy; // posto nije koriscen search
      
      filteredArray = this.filterThrueArry(this.allFlights, filterFlight);

    }
    else {
      filteredArray = this.filterThrueArry(this.allFlights, filterFlight);
    }

    if (filteredArray.length > 0) {
      this.allFlights = filteredArray;
    }
  }

  private filterThrueArry(array: Array<Flight>, filterFlight: FilterFlight): Array<Flight>{
    let filteredDate = new Array<Flight>();
    let filteredPrice = new Array<Flight>();
    let filteredDistance = new Array<Flight>();
    let filteredChangeover = new Array<Flight>();

    if (filterFlight.pricefrom != null && filterFlight.priceto != null) {
      array.forEach(element => {
        if (filterFlight.pricefrom != null && filterFlight.pricefrom <= element.prise) {
          if (filterFlight.priceto != null && filterFlight.priceto >= element.prise) {
            filteredPrice.push(element);
          }
        }
      });
    }
    else {
      filteredPrice = array;
    }
    
    if (filterFlight.distancefrom != null && filterFlight.distanceto != null) {
      filteredPrice.forEach(element => {
        if (filterFlight.distancefrom != null && filterFlight.distancefrom <= element.duzinaPutovanja) {
          if (filterFlight.distanceto != null && filterFlight.distanceto >= element.duzinaPutovanja) {
            filteredDistance.push(element);
          }
        }
      });
    }
    else {
      filteredDistance = filteredPrice;
    }
    
    if (filterFlight.changeoverfrom != null && filterFlight.changeoverto != null) {
      filteredDistance.forEach(element => {
        if (filterFlight.changeoverfrom != null && filterFlight.changeoverfrom <= element.presedanje.brojPresedanja) {
          if (filterFlight.changeoverto != null && filterFlight.changeoverto >= element.presedanje.brojPresedanja) {
            filteredChangeover.push(element);
          }
        }
      });
    }
    else {
      filteredChangeover = filteredDistance;
    }

    return filteredChangeover;
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

  searchedCompanies(allFlights: Array<Flight>) {
    this.allFlights = allFlights;
    if (this.allFlights.length == 0) {
      this.error = true;
      this.errorText = "List is empty!";
      this.loading = false;
    }
    else {
      this.loading = false;
    }
  }
}
