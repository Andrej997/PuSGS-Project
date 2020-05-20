import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { HttpParams } from '@angular/common/http';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { Car } from 'src/app/entities/car/car';
import { RentACarBranch } from 'src/app/entities/rent-a-car-branch/rent-a-car-branch';
import { ShareDataServiceService } from 'src/app/services/share-data-service/share-data-service.service';

@Component({
  selector: 'app-rent-detail',
  templateUrl: './rent-detail.component.html',
  styleUrls: ['./rent-detail.component.css']
})
export class RentDetailComponent implements OnInit {

  @Output() city: string;
  @Output() carService: RentACarService;
  @Output() car: Car;
  @Output() branch: RentACarBranch;
  @Output() kwks: number;
  @Output() days: number;
  @Output() babySeatPrice: number;
  @Output() nav: number;
  @Output() roofR: number;

  message:string;


  constructor(private route: ActivatedRoute,
              private carServiceService: CarServiceService,
              private data: ShareDataServiceService) { 
      this.kwks = 1.359621617;
      this.days = 5;

      var carServiceStr;
      var carId;
      route.params.subscribe(params => { this.city = params['cityId']; });
      route.params.subscribe(params => { carServiceStr = params['serviceId']; });
      route.params.subscribe(params => { carId = params['carId']; });
      route.params.subscribe(params => { this.branch = params['branchId']; });
      
      this.carService = carServiceService.getService(carServiceStr, this.city);
      this.carService.carlist.forEach(element => {
        if(element.id == carId){
          this.car = element;
        }
      });

      this.carService.pricelist.forEach(element => {
        if(element[0] == "babySeat"){
            this.babySeatPrice = element[1];
        }
        else if(element[0] == "navigation"){
          this.nav = element[1];
        }
        else if(element[0] == "roofRack"){
          this.roofR = element[1];
        }
      });

    }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  changed = (evt, paramName) => {    
    //console.log(evt.target.checked);
    //console.log(paramName);


    if(paramName == "babySeat"){
      if(evt.target.checked){
        this.car.pricePerDay += this.babySeatPrice;
      }
      else{
        this.car.pricePerDay -= this.babySeatPrice;
      }
    }
    else if(paramName == "navigation"){
      if(evt.target.checked){
        this.car.pricePerDay += this.nav;
      }
      else{
        this.car.pricePerDay -= this.nav;
      }
    }
    else if(paramName == "roofRack"){
      if(evt.target.checked){
        this.car.pricePerDay += this.roofR;
      }
      else{
        this.car.pricePerDay -= this.roofR;
      }
    }


    
    }

}
