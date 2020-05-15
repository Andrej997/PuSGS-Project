import { Component, OnInit, Input } from '@angular/core';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { Car } from 'src/app/entities/car/car';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.css']
})
export class FilterSideBarComponent implements OnInit {

  city: string;
  services: RentACarService[];
  cars: Car[];

  constructor( private route: ActivatedRoute,
               private carServiceService: CarServiceService) {
    route.params.subscribe(params => { this.city = params['cityId']; });
    this.services = carServiceService.getServicesInCity(this.city);
    //console.log(this.services);
    this.cars = this.carServiceService.loadCars();

   }



  
  ngOnInit(): void {
  }

}
