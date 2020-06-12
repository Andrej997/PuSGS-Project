import { Component, OnInit } from '@angular/core';
import { FlightsComponent } from '../flights/flights.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FilterFlight } from 'src/app/entities/filter-flight/filter-flight';

@Component({
  selector: 'app-filter-flight',
  templateUrl: './filter-flight.component.html',
  styleUrls: ['./filter-flight.component.css']
})
export class FilterFlightComponent implements OnInit {
  filterFlight: FilterFlight;

  error: boolean = false;
  errorText: string = "";

  constructor(private flightsComponent: FlightsComponent) { }

  ngOnInit(): void {
  }
  
  form = new FormGroup({
    datefrom: new FormControl(),
    dateto: new FormControl(),
    pricefrom: new FormControl(),
    priceto: new FormControl(),
    distancefrom: new FormControl(),
    distanceto: new FormControl(),
    changeoverfrom: new FormControl(),
    changeoverto: new FormControl()
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    this.filterFlight = new FilterFlight((this.form.value.datefrom), 
                                          this.form.value.dateto,
                                          this.form.value.pricefrom,
                                          this.form.value.priceto,
                                          this.form.value.distancefrom,
                                          this.form.value.distanceto,
                                          this.form.value.changeoverfrom,
                                          this.form.value.changeoverto);

    if (this.filterFlight.changeoverfrom < 0 || 
        this.filterFlight.changeoverto > 5 || 
        this.filterFlight.distancefrom < 0 ||
        this.filterFlight.distanceto > 100000 ||
        this.filterFlight.pricefrom < 0 ||
        this.filterFlight.priceto > 100000) {
          this.error = true;
          this.errorText = "Filter input not good!";
        }
    else {
      this.error = false;
      this.flightsComponent.filter(this.filterFlight);
    }
  }

  showAll(){
    this.flightsComponent.cancelSearch();
  }

}
