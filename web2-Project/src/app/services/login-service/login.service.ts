import { Injectable } from '@angular/core';
import { Login } from 'src/app/entities/login/login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  mockUsers() {
    let allUsers = new Array<Login>();

    const u1 = new Login('admin', 'admin');
    const u2 = new Login('adminAvio', 'admin');
    const u3 = new Login('adminRent', 'admin');

    allUsers.push(u1);
    allUsers.push(u2);
    allUsers.push(u3);

    return allUsers;
  }
}
