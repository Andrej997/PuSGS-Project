import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  imgUrl: string;

  constructor(private router: Router, 
              public authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.imgUrl = this.authenticationService.currentUserValue.profileImage;
      console.log(this.imgUrl);
    }
  }

  ngOnInit(): void {
  }

  h(){
    alert("ss");
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
