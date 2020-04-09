import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company';

@Component({
  selector: 'app-avio-company-details',
  templateUrl: './avio-company-details.component.html',
  styleUrls: ['./avio-company-details.component.css']
})
export class AvioCompanyDetailsComponent implements OnInit {

  id: number;
  flightCompany: FlightCompany;

  constructor(private route: ActivatedRoute, private avioCompaniesService: AvioCompaniesService) { 
    route.params.subscribe(params => { this.id = params['id']; });
    this.flightCompany = avioCompaniesService.getCompany(this.id);
    console.log(this.flightCompany);
  }

  ngOnInit(): void {
    
  }

}
