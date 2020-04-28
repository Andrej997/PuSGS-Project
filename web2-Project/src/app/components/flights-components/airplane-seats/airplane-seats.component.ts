import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights-service/flights.service';
import { Flight } from 'src/app/entities/flight/flight';

@Component({
  selector: 'app-airplane-seats',
  templateUrl: './airplane-seats.component.html',
  styleUrls: ['./airplane-seats.component.css']
})
export class AirplaneSeatsComponent implements OnInit {
  seats: number = 0; // broj ukupno kliknutih mesta

  private clickedImg: Array<boolean>;
  public numSeats: number = 0;
  public flight: Flight;
  
  constructor(private flightsService: FlightsService) { }

  ngOnInit(): void {
    this.flight = this.flightsService.getFlight();
    this.numSeats = this.flight.aeroplane.numSeats;
    let clickedImg = new Array<boolean>(this.numSeats);
    for (let i = 0; i < this.numSeats; ++i) {
      clickedImg[i] = false;
    }
    this.clickedImg = clickedImg;
  }

  checkUncheckSeat(event) {
    let selectedId = event.target.id;
    // ako mesto vec nije rezervisano, moze da se rezervise
    if (!this.flight.aeroplane.allSeats[selectedId].rezervisano) { 
      let img = document.getElementById(selectedId);
      if (!this.clickedImg[selectedId]) {
        this.clickedImg[selectedId] = true;
        img.style.backgroundColor = 'green';
        ++this.seats;
      }
      else {
        this.clickedImg[selectedId] = false;
        img.style.backgroundColor = 'white';
        --this.seats;
      }
      //console.log(img);
    }
    
    this.flightsService.setSeatsNumber(this.seats, this.clickedImg);
    //console.log(this.seats);
  }

  createRange(number) {   // simulacija for petlje u html-u
    var items: number[] = [];
    for(var i = 0; i < number; i++){
       items.push(i);
    }
    return items;
  }

}
