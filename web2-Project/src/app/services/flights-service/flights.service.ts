import { Injectable } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight'

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor() { }

  loadFlights() {
    console.log('Učitavanje letova...');
    return this.mockedFlights();
  }

  mockedFlights(): Array<Flight> /* ovo predstavlja tip return val*/{
    let allFlights = new Array<Flight>();
/*
    const f1 = new Flight('Air Serbia', 'Belgrade', 'New York',"../../../assets/img/new york.jpg",
                    new Date(Date.parse("2020-04-24 22:00:00+0000")),
                    new Date(Date.parse("2020-06-09 02:35:00+0000")), 600);
    const f2 = new Flight('Air Balktik', 'Paris', 'Peking', "../../../assets/img/peking.jpg",
                    new Date(Date.parse("2020-03-15 13:45:00+0000")), 
                    new Date(Date.parse("2020-03-30 19:45:00+0000")), 1698.77);
    const f3 = new Flight('Wizz Air', 'Munchen', 'Los Angeles', "../../../assets/img/los angeles.jpg",
                    new Date(Date.parse("2020-12-24 13:45:00+0000")), 
                    new Date(Date.parse("2021-01-03 13:45:00+0000")), 1300.99);
    const f4 = new Flight('Turkish Airlines', 'Budapest', 'Moskov', "../../../assets/img/moskva.jpg",
                    new Date(Date.parse("2020-04-24 22:00:00+0000")), 
                    new Date(Date.parse("2020-06-09 02:35:00+0000")), 600);
    allFlights.push(f1);
    allFlights.push(f2);
    allFlights.push(f3);
    allFlights.push(f4);

    console.log(f1);*/

    return allFlights;
  }

}
