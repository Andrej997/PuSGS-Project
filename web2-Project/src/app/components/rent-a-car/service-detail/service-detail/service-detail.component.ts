import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { Address } from 'src/app/entities/address/address';
import { RentACarBranch } from 'src/app/entities/rent-a-car-branch/rent-a-car-branch';
import { Car } from 'src/app/entities/car/car';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  //myCarServices: Array<RentACarService>;
  //service: RentACarService;
  adr: Address;
  id: number;
  myService: RentACarService;
  currentUser: User;
  cars: Array<Car>;
  allcars: Array<Car>;


// var pricelist = new Array<[string, number]>();
  //   pricelist.push(["babySeat", 2.02])
  //   pricelist.push(["navigation", 2.3])
  //   pricelist.push(["roofRack", 5])

  constructor(private route: ActivatedRoute,
              private carServiceService: CarServiceService,
              public router: Router,
              private authenticationService: AuthenticationService) { 
    route.params.subscribe(params => { this.id = params['id']; });
    this.currentUser = this.authenticationService.currentUserValue;
    this.allcars = new Array<Car>();
    //this.myService = carServiceService.getServiceOverId(this.id);
    carServiceService.getCarServiceId(this.id.toString()).subscribe((res:any)=>{
      //res.forEach(element => {
        console.log("wwwwww");
        console.log(this.id);
        console.log(res);
        console.log(res.racAdmin);
        console.log(this.currentUser);
        if(res.racAdmin.id == this.currentUser.id && res.idRAC == this.id){
          console.log(res);
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
            this.cars.push(car);
            this.allcars.push(car);
          });

          this.myService = new RentACarService(res.idRAC, 
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
        }
      //});
      console.log("this.serviceeeee");                                   
      console.log(this.myService); 
    },
    err => {
      console.log("Err: " + err);
      alert(err + "Pokusaj ponovo!");
    });
  }

  ngOnInit(): void {
  }

  editService(){
    var str = "/rent-a-car-profile/create-or-replace-service";
    this.router.navigateByUrl(str);
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
