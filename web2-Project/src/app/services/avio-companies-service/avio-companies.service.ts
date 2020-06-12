import { Injectable } from '@angular/core';

import { Address } from 'src/app/entities/address/address'
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company'
import { Flight } from 'src/app/entities/flight/flight';
import { AvioSediste } from 'src/app/entities/avio-sediste/avio-sediste';
import { FlightDestination } from 'src/app/entities/flight-destination/flight-destination';
import { Presedanje } from 'src/app/entities/flight-presedanje/presedanje';
import { Aeroplane } from 'src/app/entities/aeroplane/aeroplane';
import { AeroplaneServiceService } from '../aeroplane-service/aeroplane-service.service';
import { AvioLuggage } from 'src/app/entities/avio-luggage/avio-luggage';
import { StringForICollection } from 'src/app/entities/StringForICollection/string-for-icollection';
import { DoubleForICollection } from 'src/app/entities/DoubleForICollection/double-for-icollection';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AvioCompaniesService {
  allAvioCompanies: Array<FlightCompany>;
  avioCompanies: FlightCompany;
  constructor(private aeroplaneServiceService: AeroplaneServiceService) { }

  loadAvioCompanies() {
    console.log('Učitavanje kompanija...');
    return this.mockedAvioCompanies();
  }


  private setSeatsForFastReservation(flight: Flight, idS :Array<number>): Flight {
    // flight.aeroplane.allSeats.forEach(element => {
    //   idS.forEach(element1 => {
    //     if (element1 === element.id) {
    //       element.isFastReservation = true;
    //     }
    //   });
    // });
    return flight;
  }

  mockedAvioCompanies(): Array<FlightCompany> /* ovo predstavlja tip return val*/{
    let allFlights = new Array<FlightCompany>();
//#region avio company 1
    const A1id = 1;
    const a1 = new Address('Jurije Gagarina 12', 'Belgrade', 'Serbia');
    const destListA1 = Array<FlightDestination>();
    const d1a1 = new FlightDestination(new Address("Rue Costes et Bellonte", "Nice", "France"), new Address("Rue Costes et Bellonte", "Nice", "France"));
    const d2a1 = new FlightDestination(new Address("Cesta Dr. Franje Tuđmana 1270", "Split", "Croatia"), new Address("Rue Costes et Bellonte", "Nice", "France"));
    const d3a1 = new FlightDestination(new Address("street", "New York", "USA"), new Address("Rue Costes et Bellonte", "Nice", "France"));
    const d4a1 = new FlightDestination(new Address("street", "Los Angeles", "USA"), new Address("Rue Costes et Bellonte", "Nice", "France"));
    destListA1.push(d1a1);
    destListA1.push(d2a1);
    destListA1.push(d3a1);
    destListA1.push(d4a1);
    const flights = new Array<Flight>();
    let flight1A1 = new Flight(1, 'Air Serbia', A1id, "../../../assets/img/avio companies/air serbia.png", 
            new Address("ulica i broj", 'Belgrade', 'Serbia'), 
            new Address("ulica i broj", 'New York', 'USA'), 
            "../../../assets/img/new york.jpg",
            new Date(Date.parse("2020-04-24 22:00:00+0000")), new Date(Date.parse("2020-04-25 12:15:00+0000")),
            658, 2*658-100, "14:15:00", 1500, new Presedanje(0, new Array<StringForICollection>()), 
            this.aeroplaneServiceService.mockedAvioCompanies()[0], new AvioLuggage(20, 5, 40, 120));
    flight1A1.numOfFastReseravtions = 5;
    flight1A1.discountForFastReservation = 10;
    flight1A1 = this.setSeatsForFastReservation(flight1A1, [3, 4, 23, 55, 89]);
    const flight2A1 = new Flight(2, 'Air Serbia', A1id, "../../../assets/img/avio companies/air serbia.png", 
            new Address("ulica i broj", 'Belgrade', 'Serbia'), 
            new Address("ulica i broj", 'Los Angeles', 'USA'), 
            "../../../assets/img/los angeles.jpg",
            new Date(Date.parse("2020-04-24 22:00:00+0000")), new Date(Date.parse("2020-04-25 12:15:00+0000")),
            1202.69, 1202.69*2-100,"14:15:00", 1500, new Presedanje(0, new Array<StringForICollection>()),
            this.aeroplaneServiceService.mockedAvioCompanies()[1], new AvioLuggage(13, 3, 40, 90));
    flights.push(flight1A1);
    flights.push(flight2A1);
    const fastReservation = new Array<Flight>();
    const sedista = new Array<AvioSediste>();
    const oceneA1 = new Array<DoubleForICollection>();
    const f1 = new FlightCompany(
      A1id, 
      'Air Serbia', 
      a1, 
      "Sigurno letenje s nama",
      destListA1,
      flights,
      "../../../assets/img/avio companies/air serbia.png", 
      oceneA1);
    allFlights.push(f1);
//#endregion
//#region avio company 2
    const A2id = 2;
    const A2name = 'Turkish Airlines';
    const a2 = new Address('Atatürk Havalimanı Cd. No:3/1', 'İstanbul', 'Turkey');
    const destListA2 = Array<FlightDestination>();
    const d1a2 = new FlightDestination(new Address('Jurije Gagarina 12', 'Belgrade', 'Serbia'), new Address("Rue Costes et Bellonte", "Nice", "France"));
    const d2a2 = new FlightDestination(new Address('adress', 'Bejing', 'China'), new Address("Rue Costes et Bellonte", "Nice", "France"));
    destListA2.push(d1a2);
    destListA2.push(d2a2);
    const flights2 = new Array<Flight>();
    const flight1A2 = new Flight(1, A2name, A2id, "../../../assets/img/avio companies/turkish airlines.png", 
            new Address("ulica i broj", 'Belgrade', 'Serbia'), 
            new Address("ulica i broj", 'Bejing', 'China'), 
            "../../../assets/img/peking.jpg",
            new Date(Date.parse("2020-04-24 22:00:00+0000")), new Date(Date.parse("2020-04-25 12:15:00+0000")),
            1995, 1995*2-100, "14:15:00", 1500, new Presedanje(0, new Array<StringForICollection>()),
            this.aeroplaneServiceService.mockedAvioCompanies()[2], new AvioLuggage(20, 5, 40, 90));
    const flight2A2 = new Flight(2, A2name, A2id, "../../../assets/img/avio companies/turkish airlines.png",
            new Address("ulica i broj", 'Belgrade', 'Serbia'), 
            new Address("ulica i broj", 'Los Angeles', 'USA'), 
            "../../../assets/img/los angeles.jpg",
            new Date(Date.parse("2020-04-24 22:00:00+0000")), new Date(Date.parse("2020-04-25 12:15:00+0000")),
            766, 766*2-100,"14:15:00", 1500, new Presedanje(0, new Array<StringForICollection>()),
            this.aeroplaneServiceService.mockedAvioCompanies()[3], new AvioLuggage(22, 5, 30, 70));
    flights2.push(flight1A2);
    flights2.push(flight2A2);
    const fastReservation2 = new Array<Flight>();
    const sedista2 = new Array<AvioSediste>();
    const oceneA2 = new Array<DoubleForICollection>();
    const f2 = new FlightCompany(
      A2id, 
      A2name, 
      a2, 
      "Sigurno letenje s nama",
      destListA2,
      flights2,
      "../../../assets/img/avio companies/turkish airlines.png",
      oceneA2);
    allFlights.push(f2);
//#endregion
//#region avio company 3
const a3 = new Address('60549 Frankfurt am Main', 'Frankfurt', 'Germany');
const destListA3 = Array<FlightDestination>();
const d1a3 = new FlightDestination(new Address('Jurije Gagarina 12', 'Belgrade', 'Serbia'), new Address("Rue Costes et Bellonte", "Nice", "France"));
destListA3.push(d1a3);
const flights3 = new Array<Flight>();
const fastReservation3 = new Array<Flight>();
const sedista3 = new Array<AvioSediste>();
const oceneA3 = new Array<DoubleForICollection>();
const f3 = new FlightCompany(
  3, 
  'Lufthansa', 
  a3, 
  "Sigurno letenje s nama",
  destListA3,
  flights3,
  "../../../assets/img/avio companies/lufthansa.jpg",
  oceneA3);
allFlights.push(f3);
//#endregion
    return allFlights;
  }

  getCompany(id: number) : FlightCompany{
    this.allAvioCompanies = this.mockedAvioCompanies();
    this.allAvioCompanies.forEach(element => {
      if (element.id == id){
        this.avioCompanies = element;
      }
        
    });
    return this.avioCompanies;
  }

  getAllFligths() : Array<Flight> {
    this.allAvioCompanies = this.mockedAvioCompanies();
    let allFlights = new Array<Flight>();

    this.allAvioCompanies.forEach(element => {
      element.flights.forEach(element1 => {
        allFlights.push(element1);
      });
    });

    return allFlights;
  }

  getFlightProfile(idCompany: number, idFlight: number): Flight{
    let flight;
    this.getCompany(idCompany).flights.forEach(element => {
      if (element.id == idFlight) {
        flight = element;
      }
    });

    return flight;
  }

  // koristi se u cc-flight component
  getAvioCompanyNames(): Array<string> {
    let names = new Array<string>();
    this.allAvioCompanies.forEach(element => {
      // console.log(element);
      names.push(element.name);
    });
    return names;
  }

  // koristi se u cc-flight component
  getAvioCompanyData(companyName: string): Array<any> {
    let data = new Array<any>();
    for (let i = 0; i < this.allAvioCompanies.length; ++i) {
      if (companyName === this.allAvioCompanies[i].name) {
        data.push(this.allAvioCompanies[i].id); // id of company
        let indexOfFlight = 0;
        this.allAvioCompanies[i].flights.forEach(element => {
          ++indexOfFlight; // ovako nalazimo ukupan broj
        });
        data.push(++indexOfFlight); // naredni let
        data.push(this.allAvioCompanies[i].logo);
      }
    }

    return data;
  }

  // saves the new flight
  saveNewFlight(companyId: number, flight: Flight) {
    for (let i = 0; i < this.allAvioCompanies.length; ++i) {
      if (this.allAvioCompanies[i].id === companyId) {
        this.allAvioCompanies[i].flights.push(flight);
        break;
      }
    }
  }
}
