import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { HttpParams } from '@angular/common/http';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { Car } from 'src/app/entities/car/car';
import { RentACarBranch } from 'src/app/entities/rent-a-car-branch/rent-a-car-branch';
import { ShareDataServiceService } from 'src/app/services/share-data-service/share-data-service.service';
import { Address } from 'src/app/entities/address/address';

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

  cars: Array<Car>;
  allcars: Array<Car>;
  adr: Address;

  constructor(private route: ActivatedRoute,
              private carServiceService: CarServiceService,
              private data: ShareDataServiceService) { 
      this.kwks = 1.359621617;
      this.days = 5;
      this.cars = new Array<Car>();
      this.allcars = new Array<Car>();
      var carServiceStr;
      var carId;
      route.params.subscribe(params => { this.city = params['cityId']; });
      route.params.subscribe(params => { carServiceStr = params['serviceId']; });
      route.params.subscribe(params => { carId = params['carId']; });
      route.params.subscribe(params => { this.branch = params['branchId']; });
      
      console.log("+++++++++++++++++");

      carServiceService.getCarServiceId(carServiceStr).subscribe((res:any)=>{
        //res.forEach(element => {
          console.log("wwwwww");
          console.log(res);
          console.log(res.racAdmin);
          //if(res.racAdmin.id == this.currentUser.id && res.idRAC == this.id){
            this.adr = new Address(res.racAddress.streetAndNumber, 
                                   res.racAddress.city, 
                                   res.racAddress.country);
  
            var pricelist = new Array<[string, number]>();
            res.cenovnik.stavkeCenovnika.forEach(element1 => {
              pricelist.push([element1.naziv, element1.vrednost]);
            });
            
            var branches =  Array<RentACarBranch>();
  
            res.racBranches.forEach(element3 => {
              var adrr = new RentACarBranch(new Address(element3.streetAndNumber, element3.city, element3.country));
              branches.push(adrr);
            });
  
            this.cars = new Array<Car>();
            var comments = Array<string>();
            comments.push("Odlicna saradnja.");
            comments.push("Povoljne cene, svaka preporuka");
            
            res.racServiceCars.forEach(element4 => {
              var car = new Car(element4.idCar, 
                                element4.carImage,
                                this.ReturnBrand(element4.brand),
                                element4.model,
                                this.ReturnType(element4.type),
                                element4.cm3,
                                element4.kw,
                                element4.doors,
                                element4.gear,
                                element4.fuel,
                                element4.year,
                                element4.seats,
                                element4.freeSeats,
                                element4.truenk,
                                element4.pricePerDay,
                                null,
                                null,
                                element4.babySeat,
                                element4.navigation,
                                element4.roofRack)
              this.car = car;
              this.cars.push(car);
              this.allcars.push(car);
            });
  
            this.carService = new RentACarService(res.idRAC, 
                                              res.name, 
                                              this.adr, 
                                              res.description, 
                                              res.logoImage, 
                                              pricelist,
                                              this.cars,
                                              branches, 
                                              null, 
                                              null, 
                                              comments);
                                              
            //this.myCarServices.push(this.service);
          //}
        //});
        console.log("this.serviceeeee");                                   
        console.log(this.carService); 
      },
      err => {
        console.log("Err: " + err);
        alert(err + "Pokusaj ponovo!");
      });


      // this.carService = carServiceService.getService(carServiceStr, this.city);
      // this.carService.carlist.forEach(element => {
      //   if(element.id == carId){
      //     this.car = element;
      //   }
      //});
                console.log(this.carService);
      // this.carService.pricelist.forEach(element => {
      //   if(element[0] == "babySeat"){
      //       this.babySeatPrice = element[1];
      //   }
      //   else if(element[0] == "navigation"){
      //     this.nav = element[1];
      //   }
      //   else if(element[0] == "roofRack"){
      //     this.roofR = element[1];
      //   }
      // });

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
    ReturnBrand(num: number): string
  {
      switch (num)
      {
          case 1:
              return "AlfaRomeo";
          case 2:
              return "Audi";
          case 3:
              return "BMW";
          case 4:
              return "Citroen";
          case 5:
              return "Fiat";
          case 6:
              return "Ford";
          case 7:
              return "Mercedes";
          case 8:
              return "Peugeot";
          case 9:
              return "Porsche";
          case 10:
              return "Toyota";
          case 11:
              return "Volkswagen";
          case 12:
              return "Volvo";
          case 13:
              return "Yugo";
          default:
              return "Skoda";

      }
  }
  ReturnType(num: number)
  {
      switch (num)
      {
          case 1:
              return "Convertable";
          case 2:
              return "Crossoover";
          case 3:
              return "Hatchback";
          case 4:
              return "Luxuary";
          case 5:
              return "Minivan";
          default:
              return "Sedan";

      }
  }

}
