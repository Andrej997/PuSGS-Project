import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SearchFlight } from 'src/app/entities/search-flight/search-flight';
import { FlightsComponent } from '../flights/flights.component';
import { Flight } from 'src/app/entities/flight/flight';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  searchClass: SearchFlight;
  constructor(private flightsComponent: FlightsComponent,
    private httpService: HttpServiceService) { }

  ngOnInit(): void {
  }
  
  form = new FormGroup({
    search: new FormControl('', [Validators.required]),
    selectSearch: new FormControl('', [Validators.required])
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    this.flightsComponent.loading = true;
    let selectType: number = Number.parseInt(this.form.value.selectSearch);
    let inputSearch: string = this.form.value.search;
    let searchClass = new SearchFlight(selectType, inputSearch);
    // this.flightsComponent.search(this.searchClass);
    this.httpService.postAction('SearchFlights', 'SearchFlights', searchClass).subscribe(
      res => { 
        this.flightsComponent.error = false;
        this.flightsComponent.searchedCompanies(res as Array<Flight>);
        this.flightsComponent.loading = false;
        
      },
      err => { 
        this.flightsComponent.errorText = err; 
        this.flightsComponent.error = true; 
        this.flightsComponent.loading = false;
      }
    );
  }

  showAll(){
    this.flightsComponent.loading = true;
    this.httpService.getAction('Flight')
      .toPromise()
      .then(result => {
        this.flightsComponent.searchedCompanies(result as Array<Flight>);
        //console.log(this.allAvioCompanies);
        this.flightsComponent.loading = false;
        this.flightsComponent.error = false;
      })
      .catch(
        err => {
          console.log(err)
          this.flightsComponent.error = true;
          this.flightsComponent.errorText = "Error while loading companies!";
          this.flightsComponent.loading = false;
        });
  }

}
