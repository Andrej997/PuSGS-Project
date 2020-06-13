import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { Car } from 'src/app/entities/car/car';
import { ShareDataServiceService } from 'src/app/services/share-data-service/share-data-service.service';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { Rezervacija } from 'src/app/entities/rezeracija/rezervacija';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-filtered-cars',
  templateUrl: './filtered-cars.component.html',
  styleUrls: ['./filtered-cars.component.css']
})
export class FilteredCarsComponent implements OnInit {
  @Input() services;
  @Input() cars;

  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;

  currentUser: User;
  
  constructor(public router: Router,
              private data : ShareDataServiceService,
              private carService : CarServiceService,
              private authenticationService: AuthenticationService) { 
    //this.services = carServiceService.getServicesInCity(this.city);
    this.currentUser = this.authenticationService.currentUserValue;
    console.log(this.currentUser);
    console.log("this.currentUserrrr");
    this.data.startD.subscribe(startDay => this.startDay = startDay);
    this.data.endD.subscribe(endDay => this.endDay = endDay);
    this.data.startT.subscribe(startTime => this.startTime = startTime);
    this.data.endT.subscribe(endTime => this.endTime = endTime);
  }

  ngOnInit(): void {
  }
  rez: Rezervacija;
  rentacar(car : Car){

    console.log("car");
    console.log(car);

    this.rez = new Rezervacija();
    
    this.rez.idCar = car.id.toString();
    this.rez.startDay = this.startDay;
    this.rez.endDay = this.endDay;
    this.rez.startTime = this.startTime;
    this.rez.endTime = this.endTime;
    console.log(this.currentUser.id);
    console.log("this.currentUserrrr");
    this.rez.idUser = this.currentUser.id.toString();

    this.carService.createReservation(this.rez).subscribe(
      (res: any) => {
        console.log("reservationnnnnn");
        console.log(res);
        alert("Reservation created . . .")
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    );
  }

  func(service: RentACarService, car: Car){
    console.log(service);
    var e = (document.getElementById(service.name)) as HTMLSelectElement;
    console.log(e);
     var sel = e.selectedIndex;
     var opt = e.options[sel];
     var CurValue = (opt).value;

     console.log(CurValue);
     console.log("ssss");
     console.log(this.services);
     console.log(service);
     console.log(this.cars);
     console.log(car);

    var str = "/rent-a-car/" + service.address.city + "/just-rent/" + service.id + "/" + CurValue + "/" +  car.id +"/rent-detail";
    console.log(str);
    this.router.navigateByUrl(str);

  }


}
