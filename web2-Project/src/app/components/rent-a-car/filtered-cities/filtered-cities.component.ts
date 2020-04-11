import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';


@Component({
  selector: 'app-filtered-cities',
  templateUrl: './filtered-cities.component.html',
  styleUrls: ['./filtered-cities.component.css']
})
export class FilteredCitiesComponent implements OnInit {
  
  @Input() filteredCity;

  currentUser: User;
  currentUserEmail = '';
  
  constructor(public authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentUserEmail = this.currentUser.email;
    }
  }

  ngOnInit(): void {
  }

}
