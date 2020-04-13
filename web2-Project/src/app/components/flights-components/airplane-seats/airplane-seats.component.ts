import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights-service/flights.service';

@Component({
  selector: 'app-airplane-seats',
  templateUrl: './airplane-seats.component.html',
  styleUrls: ['./airplane-seats.component.css']
})
export class AirplaneSeatsComponent implements OnInit {
  toggle1 = true;
  toggle2 = true;
  toggle3 = true;
  toggle4 = true;
  toggle5 = true;
  toggle6 = true;
  seats: number = 0;
  
  constructor(private flightsService: FlightsService) { }

  ngOnInit(): void {
  }

  checkUncheckSeat(event) {
    let selectedId = event.target.id;
    let symbol: string;

    if (selectedId == 1) {
      this.toggle1 = !this.toggle1;
      if (!this.toggle1) {
        ++this.seats;
        symbol = '+';
      }
      else {
        --this.seats;
        symbol = '-';
      }
    }
    else if (selectedId == 2) {
      this.toggle2 = !this.toggle2;
      if (!this.toggle2) {
        ++this.seats;
        symbol = '+';
      }
      else {
        --this.seats;
        symbol = '-';
      }
    }
    else if (selectedId == 3) {
      this.toggle3 = !this.toggle3;
      if (!this.toggle3) {
        ++this.seats;
        symbol = '+';
      }
      else {
        --this.seats;
        symbol = '-';
      }
    }
    else if (selectedId == 4) {
      this.toggle4 = !this.toggle4;
      if (!this.toggle4) {
        ++this.seats;
        symbol = '+';
      }
      else {
        --this.seats;
        symbol = '-';
      }
    }
    else if (selectedId == 5) {
      this.toggle5 = !this.toggle5;
      if (!this.toggle5) {
        ++this.seats;
        symbol = '+';
      }
      else {
        --this.seats;
        symbol = '-';
      }
    }
    else if (selectedId == 6) {
      this.toggle6 = !this.toggle6;
      if (!this.toggle6) {
        ++this.seats;
        symbol = '+';
      }
      else {
        --this.seats;
        symbol = '-';
      }
    }
    this.flightsService.setSeatsNumber(this.seats, symbol);
    //console.log(this.seats);
  }

}
