import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  imgUrl: string;
  currentUser: User;
  fR: number; // number of friend req
  uM: number; // unread messages

  avioServiceId: number = 0;

  constructor(private router: Router, private httpService: HttpServiceService,
              public authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.imgUrl = this.authenticationService.currentUserValue.profileImage;
      this.currentUser = this.authenticationService.currentUserValue;
      // this.fR = this.currentUser.friendRequests.length;
      this.fR = 5;
      //this.uM = this.currentUser.friends.;
      this.uM = 2;

      this.getUserAvioServiceId();
      
      console.log(this.currentUser);
    }
  }

  getUserAvioServiceId() {
    this.httpService.getUserIdAction("FlightCompany/User", this.currentUser.id.toString()).toPromise()
    .then(result => {
      this.avioServiceId = result as number;
    })
    .catch(
      err => {
        this.avioServiceId = 0;
        console.log(err);
      });
  }

  ngOnInit(): void {
    //this.checkAllReservations();
  }

  checkAllReservations() {
    this.httpService.getAction('FlightReservation')
      .toPromise()
      .then(result => {
      })
      .catch(
        err => {
          console.log(err)
        });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
