import { Component, OnInit } from '@angular/core';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';

@Component({
  selector: 'app-rent-a-car-profile',
  templateUrl: './rent-a-car-profile.component.html',
  styleUrls: ['./rent-a-car-profile.component.css']
})
export class RentACarProfileComponent implements OnInit {

  myCarServices: Array<RentACarService>;

  constructor(private carService: CarServiceService) {
    this.myCarServices = carService.loadAllCarServices();
  }

  ngOnInit(): void {
  }

}
