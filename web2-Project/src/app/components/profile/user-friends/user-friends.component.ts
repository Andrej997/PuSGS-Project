import { Component, OnInit } from '@angular/core';
import { User, Role } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Address } from 'src/app/entities/address/address';
import { Message } from 'src/app/entities/message/message';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {

  currentUser: User;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser);
  } 

  ngOnInit(): void { }

  accept(email: string) {
    for (let i = 0; i < this.currentUser.friendRequests.length; ++i) {
      if (this.currentUser.friendRequests[i].email === email) {
        this.currentUser.friends.push(this.currentUser.friendRequests[i]);
        this.currentUser.friendRequests.splice(i, 1);
        break;
      }
    }
  }

  decline(email: string) {
    for (let i = 0; i < this.currentUser.friendRequests.length; ++i) {
      if (this.currentUser.friendRequests[i].email === email) {
        this.currentUser.friendRequests.splice(i, 1);
        break;
      }
    }
  }

}
