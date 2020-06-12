import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { Car } from 'src/app/entities/car/car';
import { Address } from 'src/app/entities/address/address';
import { RentACarBranch } from 'src/app/entities/rent-a-car-branch/rent-a-car-branch';

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

  adr: Address;
  myService: RentACarService;

  constructor(private route: ActivatedRoute,
              private carServiceService: CarServiceService) {
    route.params.subscribe(params => { this.city = params['cityId']; });
    this.services = new Array<RentACarService>();
    //this.services = carServiceService.getServicesInCity(this.city);
    
    carServiceService.getCarServices().subscribe((res:any)=>{
      res.forEach(element => {
        console.log("just rent");
        console.log(element);
        if(element.racAddress.city == this.city ){
          console.log(element);
          this.adr = new Address(element.racAddress.streetAndNumber, 
                                element.racAddress.city, 
                                element.racAddress.country);

          var pricelist = new Array<[string, number]>();
          element.cenovnik.stavkeCenovnika.forEach(element1 => {
            pricelist.push([element1.naziv, element1.vrednost]);
          });
          
          var branches =  Array<RentACarBranch>();

          element.racBranches.forEach(element3 => {
            var adrr = new RentACarBranch(new Address(element3.streetAndNumber, element3.city, element3.country));
            branches.push(adrr);
          });

          this.cars = new Array<Car>();
          var comments = Array<string>();
          comments.push("Odlicna saradnja.");
          comments.push("Povoljne cene, svaka preporuka");
          
          element.racServiceCars.forEach(element4 => {
            var car = new Car(0, 
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
          });

          this.myService = new RentACarService(element.idRAC, 
                                            element.name, 
                                            this.adr, 
                                            element.description, 
                                            element.logoImage, 
                                            pricelist,
                                            this.cars,
                                            branches, 
                                            null, 
                                            null, 
                                            comments);

          console.log("KRAJ");
          console.log(this.myService);
          console.log(this.services);
          this.services.push(this.myService);                                  
          //this.myCarServices.push(this.service);
        }
      });
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
