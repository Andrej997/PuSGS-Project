import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';

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

  constructor(private router: Router, 
              public authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.imgUrl = this.authenticationService.currentUserValue.profileImage;
      this.currentUser = this.authenticationService.currentUserValue;
      //this.fR = this.currentUser.friendRequests.length;
      this.fR = 5;
      //this.uM = this.currentUser.messages.length;
      this.uM = 2;
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
