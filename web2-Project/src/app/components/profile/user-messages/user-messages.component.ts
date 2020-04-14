import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  currentUser: User;
  
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser.friends);
  } 

  ngOnInit(): void {
  }

}
