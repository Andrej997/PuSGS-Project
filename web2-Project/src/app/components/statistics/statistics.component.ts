import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { AvioCompaniesService } from 'src/app/services/avio-companies-service/avio-companies.service';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  currentUser: User;
  
  constructor(public authenticationService: AuthenticationService,
    private router: Router,
    private avioCompaniesService: AvioCompaniesService) { 
      if (this.authenticationService.currentUserValue) { 
        this.currentUser = this.authenticationService.currentUserValue;
        if (this.currentUser.role != 1 && this.currentUser.role != 2 && this.currentUser.role != 3) {
          this.kick();
        }
      }
      else {
        this.kick();
      }
  }

  private async kick() {
    await this.delay(3000);
    this.router.navigate(['/log-in']);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  ngOnInit(): void {
  }

}
