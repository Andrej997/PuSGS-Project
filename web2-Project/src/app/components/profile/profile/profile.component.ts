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
  city: string = "unknown city";
  country: string = "unknown country";
  streetAndNumber: string = "unknown street name & number";
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        if (this.currentUser.address != null) {
          if (this.currentUser.address.city != null) this.city = this.currentUser.address.city;
          if (this.currentUser.address.country != null) this.country = this.currentUser.address.country;
          if (this.currentUser.address.streetAndNumber != null) this.streetAndNumber = this.currentUser.address.streetAndNumber;
        }
        console.log(this.currentUser);
    }

  ngOnInit(): void {
  }


}
