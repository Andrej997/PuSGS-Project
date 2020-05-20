import { Component, OnInit } from '@angular/core';

import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-avio-companies',
  templateUrl: './avio-companies.component.html',
  styleUrls: ['./avio-companies.component.css']
})
export class AvioCompaniesComponent implements OnInit {

  error: boolean = false;
  errorText: string = "";

  list: Array<FlightCompany>;

  loading: boolean = true;

  allAvioCompanies: Array<FlightCompany> = new Array<FlightCompany>();
  constructor(private avioCompaniesService: AvioCompaniesService,
              private httpService: HttpServiceService) { 
    //this.allAvioCompanies = this.avioCompaniesService.loadAvioCompanies();
  }

  ngOnInit(): void {
    this.httpService.getAction('FlightCompany')
      .toPromise()
      .then(result => {
        this.allAvioCompanies = result as FlightCompany[];
        //console.log(this.allAvioCompanies);
        this.loading = false;
      })
      .catch(
        err => {
          console.log(err)
          this.error = true;
          this.errorText = "Error while loading companies!"
          this.loading = false;
        });
  }

}
