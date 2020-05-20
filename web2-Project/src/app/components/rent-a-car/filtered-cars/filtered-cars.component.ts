import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { Car } from 'src/app/entities/car/car';

@Component({
  selector: 'app-filtered-cars',
  templateUrl: './filtered-cars.component.html',
  styleUrls: ['./filtered-cars.component.css']
})
export class FilteredCarsComponent implements OnInit {

  @Input() services;
  @Input() cars;
  
  constructor(public router: Router) { 
    //this.services = carServiceService.getServicesInCity(this.city);
  }

  ngOnInit(): void {
  }

  func(service: RentACarService, car: Car){
    var e = (document.getElementById(service.name)) as HTMLSelectElement;
     var sel = e.selectedIndex;
     var opt = e.options[sel];
     var CurValue = (opt).value;

    var str = "/rent-a-car/" + service.address.city + "/just-rent/" + service.name + "/" + CurValue + "/" +  car.id +"/rent-detail";
    this.router.navigateByUrl(str);

  }

}
