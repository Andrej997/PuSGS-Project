import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataServiceService {

  private renAcarLogoImage = new BehaviorSubject('Nesto');
  currentLogoImage = this.renAcarLogoImage.asObservable();
  

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeLogoImage(imageString: string){
    this.renAcarLogoImage.next(imageString);
  }
  
}
