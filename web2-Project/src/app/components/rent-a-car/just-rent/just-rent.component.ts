import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { Car } from 'src/app/entities/car/car';

@Component({
  selector: 'app-just-rent',
  templateUrl: './just-rent.component.html',
  styleUrls: ['./just-rent.component.css']
})
export class JustRentComponent implements OnInit {

  city: string;
  myCity: string;
  services: RentACarService[];
  cars: Car[];

  constructor(private route: ActivatedRoute,
              private carServiceService: CarServiceService) {
    route.params.subscribe(params => { this.city = params['cityId']; });
    console.log(this.city);

    this.services = carServiceService.getServicesInCity(this.city);
    console.log(this.services);
    this.cars = this.services[0].carlist;

   }

  ngOnInit(): void {
  }

}
