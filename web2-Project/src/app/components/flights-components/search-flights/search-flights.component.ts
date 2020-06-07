import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchFlight } from 'src/app/entities/search-flight/search-flight';
import { AvioCompaniesComponent } from '../avio-companies/avio-companies.component';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {

  constructor(private avioCompaniesComponent: AvioCompaniesComponent,
    private httpService: HttpServiceService) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    search: new FormControl('', [Validators.required]),
    selectSearch: new FormControl('', [Validators.required])
  });
  
  get f() {
    return this.form.controls;
  }
  
  submit() {
    this.avioCompaniesComponent.loading = true;
    let selectType: number = Number.parseInt(this.form.value.selectSearch);
    let inputSearch: string = this.form.value.search;
    let searchClass = new SearchFlight(selectType, inputSearch);
    this.httpService.postAction('SearchFlights', 'SearchFlightCompany', searchClass).subscribe(
      res => { 
        this.avioCompaniesComponent.error = false;
        this.avioCompaniesComponent.searchedCompanies(res as Array<FlightCompany>);
        this.avioCompaniesComponent.loading = false;
        
      },
      err => { 
        this.avioCompaniesComponent.errorText = err; 
        this.avioCompaniesComponent.error = true; 
        this.avioCompaniesComponent.loading = false;
      }
    );
  }

  showAll(){
    this.httpService.getAction('FlightCompany')
      .toPromise()
      .then(result => {
        this.avioCompaniesComponent.searchedCompanies(result as Array<FlightCompany>);
        //console.log(this.allAvioCompanies);
        this.avioCompaniesComponent.loading = false;
        this.avioCompaniesComponent.error = false;
      })
      .catch(
        err => {
          console.log(err)
          this.avioCompaniesComponent.error = true;
          this.avioCompaniesComponent.errorText = "Error while loading companies!";
          this.avioCompaniesComponent.loading = false;
        });
  }

}
