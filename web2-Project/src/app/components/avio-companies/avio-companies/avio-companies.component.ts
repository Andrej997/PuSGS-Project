import { Component, OnInit } from '@angular/core';

import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';

@Component({
  selector: 'app-avio-companies',
  templateUrl: './avio-companies.component.html',
  styleUrls: ['./avio-companies.component.css']
})
export class AvioCompaniesComponent implements OnInit {

  allAvioCompanies: Array<FlightCompany>;
  constructor(private avioCompaniesService: AvioCompaniesService) { 
    this.allAvioCompanies = this.avioCompaniesService.loadAvioCompanies();
  }

  ngOnInit(): void {
  }

}
