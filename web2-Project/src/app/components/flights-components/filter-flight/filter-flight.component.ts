import { Component, OnInit } from '@angular/core';
import { FlightsComponent } from '../flights/flights.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-flight',
  templateUrl: './filter-flight.component.html',
  styleUrls: ['./filter-flight.component.css']
})
export class FilterFlightComponent implements OnInit {

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
    
  }

  showAll(){
    this.flightsComponent.cancelSearch();
  }

}
