import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Login } from 'src/app/entities/login/login';
import { User } from 'src/app/entities/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(user: User){
    this.currentUserSubject.next(user);
  }

  // login(email: string, password: string) {
  //   return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { email, password })
  //       .pipe(map(user => {
  //           // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
  //           user.authdata = window.btoa(email + ':' + password);
  //           localStorage.setItem('currentUser', JSON.stringify(user));
  //           this.currentUserSubject.next(user);
  //           return user;
  //       }));
  // }

  logout() { // remove user from local storage to log user out
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
