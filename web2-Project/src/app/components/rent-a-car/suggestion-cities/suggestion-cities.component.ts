import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user'


@Component({
  selector: 'app-suggestion-cities',
  templateUrl: './suggestion-cities.component.html',
  styleUrls: ['./suggestion-cities.component.css']
})
export class SuggestionCitiesComponent implements OnInit {
  
  @Input() suggestionCity;

  currentUser: User;
  currentUserEmail = '';
  

  constructor( public authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentUserEmail = this.currentUser.email;
    }
    
  }

  ngOnInit(): void {
  }

}
