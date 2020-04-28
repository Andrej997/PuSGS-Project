import { Injectable } from '@angular/core';
import { Aeroplane } from 'src/app/entities/aeroplane/aeroplane';
import { AvioSediste } from 'src/app/entities/avio-sediste/avio-sediste';

@Injectable({
  providedIn: 'root'
})
export class AeroplaneServiceService {

  constructor() { }

  private CreateMockedSeats(num: number):  Array<AvioSediste>{
    let seats = new Array<AvioSediste>();
    for (let i = 0; i < num; ++i) {
      let seat = new AvioSediste(i, false);
      seats.push(seat);
    }
    return seats;
  }

  public mockedAvioCompanies(): Array<Aeroplane> {
    let allAeroplanes = new Array<Aeroplane>();
    const aeroplane1NumSeats = 200;
    let aeroplane1Seats = this.CreateMockedSeats(aeroplane1NumSeats);
    let aeroplane1 = new Aeroplane(1, "Boing 747-100", aeroplane1NumSeats, aeroplane1Seats);
    allAeroplanes.push(aeroplane1);

    const aeroplane2NumSeats = 8;
    let aeroplane2Seats = this.CreateMockedSeats(aeroplane2NumSeats);
    let aeroplane2 = new Aeroplane(2, "Boing 777", aeroplane2NumSeats, aeroplane2Seats);
    allAeroplanes.push(aeroplane2);

    const aeroplane3NumSeats = 12;
    let aeroplane3Seats = this.CreateMockedSeats(aeroplane3NumSeats);
    let aeroplane3 = new Aeroplane(3, "Boing 747-300", aeroplane3NumSeats, aeroplane3Seats);
    allAeroplanes.push(aeroplane3);

    const aeroplane4NumSeats = 16;
    let aeroplane4Seats = this.CreateMockedSeats(aeroplane4NumSeats);
    let aeroplane4 = new Aeroplane(3, "Boing 747SP", aeroplane4NumSeats, aeroplane4Seats);
    allAeroplanes.push(aeroplane4);

    return allAeroplanes;
  }
}
