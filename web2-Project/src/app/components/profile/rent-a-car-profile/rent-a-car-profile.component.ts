import { Component, OnInit } from '@angular/core';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { Address } from 'src/app/entities/address/address';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-rent-a-car-profile',
  templateUrl: './rent-a-car-profile.component.html',
  styleUrls: ['./rent-a-car-profile.component.css']
})
export class RentACarProfileComponent implements OnInit {

  myCarServices: Array<RentACarService>;
  service: RentACarService;
  adr: Address;
  currentUser: User;

  constructor(private carService: CarServiceService,
              private authenticationService: AuthenticationService) {
    this.myCarServices = new Array<RentACarService>();
    this.currentUser = this.authenticationService.currentUserValue;
    //this.myCarServices = carService.loadAllCarServices();
    //this.myCarServices = carService.getCarServices() as Array<RentACarService>;
    carService.getCarServices().subscribe((res:any)=>{
      //alert("Return " + res);
      res.forEach(element => {
        console.log(element);
        console.log(element.racAdmin);
        console.log(this.currentUser);
        if(element.racAdmin.id == this.currentUser.id){
          console.log(element);
          this.adr = new Address(element.racAddress.streetAndNumber, 
                                element.racAddress.city, 
                                element.racAddress.country);

          this.service = new RentACarService(element.idRAC, 
                                            element.name, 
                                            this.adr, 
                                            element.description, 
                                            element.logoImage, 
                                            null,
                                            null,
                                            null, 
                                            null, 
                                            null, 
                                            null);
                                            
          this.myCarServices.push(this.service);
        }
      });
      console.log("this.serviceeeee");                                   
      console.log(this.service); 
      //this.myCarServices = res as Array<RentACarService>;
      console.log(this.myCarServices);
      console.log(res);
      //alert("jess") 
    },
    err => {
      console.log("Err: " + err);
      alert(err + "Pokusaj ponovo!");
    });
    console.log("ovdeeeeeeeee");
    console.log(this.myCarServices);
  }

  ngOnInit(): void {
  }

}
