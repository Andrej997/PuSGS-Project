import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

//! primeri poziva su navedeni iznad svake metode
//! poziva se kod svakog konstuktora
//! private httpService: HttpServiceService

export class HttpServiceService {

  //! osnovna putanja
  readonly rootURL = "http://localhost:57428/api";

  constructor(private http: HttpClient) { }

  //! this.httpService.postAction('FlightCompany', 'AddFlightCompany', body).subscribe(
  //!   res => { this.form.reset(); },
  //!   err => { console.log(err); }
  //! );
  postAction(controllerName: string, actionName: string, body: any) {
    return this.http.post(this.rootURL + '/' + controllerName + '/' + actionName, body);
  }

  putAction(controllerName: string, body: any) {
    return this.http.put(this.rootURL + '/' + controllerName, body);
  }

  deleteAction(controllerName: string, actionName: string, id: number) {
    return this.http.delete(this.rootURL + '/' + controllerName + '/' + actionName + '/' + id);
  }

  //! this.httpService.getAction('FlightCompany').toPromise().then(result => this.list = result as FlightCompany[]);
  getAction(controllerName: string) {
    //console.log(this.rootURL);
    //console.log(this.http.get(this.rootURL + '/' + controllerName))
    return this.http.get(this.rootURL + '/' + controllerName);
  }

  getIdAction(controllerName: string, id: number) {
    return this.http.get(this.rootURL + '/' + controllerName + '/' + id);
  }

  getEmailAction(controllerName: string, email: string) {
    return this.http.get(this.rootURL + '/' + controllerName + '/' + email);
  }

  getUserIdAction(controllerName: string, id: string) {
    return this.http.get(this.rootURL + '/' + controllerName + '/' + id);
  }

  putUserIdAction(controllerName: string, actionName: string, id: string) {
    return this.http.put(this.rootURL + '/' + controllerName, + '/' + actionName + '/' + id);
  }

  deleteUserIdAction(controllerName: string, actionName: string, id: string) {
    return this.http.delete(this.rootURL + '/' + controllerName + '/' + actionName + '/' + id);
  }
}
