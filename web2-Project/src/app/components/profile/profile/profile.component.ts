import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User; // sve se nalazi u currentUser-u
  unreadMessages = 0;
  friendReq = 0

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        //console.log(this.currentUser);
    }

  ngOnInit(): void {
    this.currentUser.messages.forEach(element => {
      if (element.isUnread) {
        ++this.unreadMessages;
      }
    });
    this.currentUser.friendRequests.forEach(element => {
      ++this.friendReq;
    });
  }


}
