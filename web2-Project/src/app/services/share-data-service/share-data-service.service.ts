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

  

  private startDay = new BehaviorSubject("");
  startD = this.startDay.asObservable();

  private endDay = new BehaviorSubject("");
  endD = this.endDay.asObservable();

  private startTime = new BehaviorSubject("");
  startT = this.startTime.asObservable();

  private endTime = new BehaviorSubject("");
  endT = this.endTime.asObservable();



  // console.log(startDay.value);
  //   console.log(endDay.value);
  //   console.log(startTime.value);
  //   console.log(endTime.value);

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

  changeStartDay(str: string){
    this.startDay.next(str);
  }
  changeEndDay(str: string){
    this.endDay.next(str);
  }
  changeStartTime(str: string){
    this.startTime.next(str);
  }
  changeEndTime(str: string){
    this.endTime.next(str);
  }
  
}
