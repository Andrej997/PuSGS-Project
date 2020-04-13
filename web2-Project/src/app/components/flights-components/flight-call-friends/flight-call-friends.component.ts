import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-flight-call-friends',
  templateUrl: './flight-call-friends.component.html',
  styleUrls: ['./flight-call-friends.component.css']
})
export class FlightCallFriendsComponent implements OnInit {
  currentUser: User; // sve se nalazi u currentUser-u
  friendOption: string = 'option1';

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser);
  }

  ngOnInit(): void {
  }

  use(event) {
    this.friendOption = event.target.id;
  }

}
