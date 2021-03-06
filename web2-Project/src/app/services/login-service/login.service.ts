import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Login } from 'src/app/entities/login/login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly BaseURI = 'http://localhost:57000/api';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.apiUrl}/users`);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/MyUser/Login', formData);
  }

  externalLogin(formData) {
    //return this.http.post(this.BaseURI + '/MyUser/Login', formData);
    return this.http.post(this.BaseURI + '/MyUser/SocialLogin', formData);
  }

  emailConfirmed(formData){
    //console.log(formData);
    return this.http.put(this.BaseURI + '/MyUser/EmailConfirmed',  formData);
  }
}
