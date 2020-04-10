import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SearchFlight } from 'src/app/entities/search-flight/search-flight';
import { FlightsComponent } from '../flights/flights.component';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  searchClass: SearchFlight;
  constructor(private flightsComponent: FlightsComponent) { }

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
    this.searchClass = new SearchFlight(this.form.value.selectSearch, this.form.value.search);
    this.flightsComponent.search(this.searchClass);
  }

  showAll(){
    this.flightsComponent.cancelSearch();
  }

}
