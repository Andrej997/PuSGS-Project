import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { FlightsService } from 'src/app/services/flights-service/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  allFlights: Array<Flight>;
  constructor(private flightsService: FlightsService) {
    this.allFlights = this.flightsService.loadFlights();
   }

  ngOnInit(): void {
  }

}
