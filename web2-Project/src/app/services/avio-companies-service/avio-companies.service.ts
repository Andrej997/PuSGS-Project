import { Injectable } from '@angular/core';

import { Address } from 'src/app/entities/address/address'
import { FlightCompany } from 'src/app/entities/flightCompany/flight-company'
import { Flight } from 'src/app/entities/flight/flight';
import { AvioSediste } from 'src/app/entities/avio-sediste/avio-sediste';
import { Cak } from 'src/app/entities/cena-avio-karte/cak';
import { FlightDestination } from 'src/app/entities/flight-destination/flight-destination';
import { Presedanje } from 'src/app/entities/flight-presedanje/presedanje';

@Injectable({
  providedIn: 'root'
})
export class AvioCompaniesService {
  allAvioCompanies: Array<FlightCompany>;
  avioCompanies: FlightCompany;
  constructor() { }

  loadAvioCompanies() {
    console.log('Učitavanje kompanija...');
    return this.mockedAvioCompanies();
  }

  mockedAvioCompanies(): Array<FlightCompany> /* ovo predstavlja tip return val*/{
    let allFlights = new Array<FlightCompany>();
//#region avio company 1
    const a1 = new Address('Jurije Gagarina 12', 'Belgrade', 'Serbia');
    const destListA1 = Array<FlightDestination>();
    const d1a1 = new FlightDestination(new Address("Rue Costes et Bellonte", "Nice", "France"), 1538.33);
    const d2a1 = new FlightDestination(new Address("Cesta Dr. Franje Tuđmana 1270", "Split", "Croatia"), 78.66);
    const d3a1 = new FlightDestination(new Address("street", "New York", "USA"), 558.66);
    const d4a1 = new FlightDestination(new Address("street", "Los Angeles", "USA"), 558.66);
    destListA1.push(d1a1);
    destListA1.push(d2a1);
    destListA1.push(d3a1);
    destListA1.push(d4a1);
    const flights = new Array<Flight>();
    const flight1A1 = new Flight(1, 'Air Serbia', "../../../assets/img/avio companies/air serbia.png", 'Belgrade', 'New York', "../../../assets/img/new york.jpg",
            new Date(Date.parse("2020-04-24 22:00:00+0000")), new Date(Date.parse("2020-04-25 12:15:00+0000")),
            599.99, "14:15:00", 1500, new Presedanje(0, ["NONE"]));
    const flight2A1 = new Flight(2, 'Air Serbia', "../../../assets/img/avio companies/air serbia.png", 'Belgrade', 'Los Angeles', "../../../assets/img/los angeles.jpg",
            new Date(Date.parse("2020-04-24 22:00:00+0000")), new Date(Date.parse("2020-04-25 12:15:00+0000")),
            599.99, "14:15:00", 1500, new Presedanje(2, ["New York", "Paris"]));
    flights.push(flight1A1);
    flights.push(flight2A1);
    const fastReservation = new Array<Flight>();
    const sedista = new Array<AvioSediste>();
    const cene = new Array<Cak>();
    const f1 = new FlightCompany(
      1, 
      'Air Serbia', 
      a1, 
      "Sigurno letenje s nama",
      destListA1,
      flights,
      fastReservation,
      sedista,
      cene,
      "informacije o prtljagu",
      "../../../assets/img/avio companies/air serbia.png");
    allFlights.push(f1);
//#endregion
//#region avio company 2
    const a2 = new Address('Atatürk Havalimanı Cd. No:3/1', 'İstanbul', 'Turkey');
    const destListA2 = Array<FlightDestination>();
    const d1a2 = new FlightDestination(new Address('Jurije Gagarina 12', 'Belgrade', 'Serbia'), 548);
    destListA2.push(d1a2);
    const flights2 = new Array<Flight>();
    const fastReservation2 = new Array<Flight>();
    const sedista2 = new Array<AvioSediste>();
    const cene2 = new Array<Cak>();
    const f2 = new FlightCompany(
      2, 
      'Turkish Airlines', 
      a2, 
      "Sigurno letenje s nama",
      destListA2,
      flights2,
      fastReservation2,
      sedista2,
      cene2,
      "informacije o prtljagu",
      "../../../assets/img/avio companies/turkish airlines.png");
    allFlights.push(f2);
//#endregion
//#region avio company 3
const a3 = new Address('60549 Frankfurt am Main', 'Frankfurt', 'Germany');
const destListA3 = Array<FlightDestination>();
const d1a3 = new FlightDestination(new Address('Jurije Gagarina 12', 'Belgrade', 'Serbia'), 257.33);
destListA3.push(d1a3);
const flights3 = new Array<Flight>();
const fastReservation3 = new Array<Flight>();
const sedista3 = new Array<AvioSediste>();
const cene3 = new Array<Cak>();
const f3 = new FlightCompany(
  3, 
  'Lufthansa', 
  a3, 
  "Sigurno letenje s nama",
  destListA3,
  flights3,
  fastReservation3,
  sedista3,
  cene3,
  "informacije o prtljagu",
  "../../../assets/img/avio companies/lufthansa.jpg");
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
}
