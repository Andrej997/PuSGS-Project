import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';

@Injectable({
  providedIn: 'root'
})
export class ShareDataServiceService {
  private renAcarLogoImage = new BehaviorSubject('');
  currentLogoImage = this.renAcarLogoImage.asObservable();

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private carImg = new BehaviorSubject("");
  carImage = this.carImg.asObservable();

  private logoImg = new BehaviorSubject("");
  logoImage = this.logoImg.asObservable();

  // private services: Rent;
  // RACServices = this.services.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeLogoImage(imageString: string){
    this.renAcarLogoImage.next(imageString);
  }

  changeCarImage(imageString: string){
    this.carImg.next(imageString);
  }

  changeRACLogoImage(imageString: string){
    this.logoImg.next(imageString);
  }

  // changeRACService(serv: Array<RentACarService>){
  //   this.services.next(serv);
  // }
  
}
