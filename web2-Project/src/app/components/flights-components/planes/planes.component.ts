import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { Aeroplane } from 'src/app/entities/aeroplane/aeroplane';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  currentUser: User;

  allPlanes: Array<Aeroplane> = new Array<Aeroplane>();

  error: boolean = false;
  errorText: string = "";

  change: boolean = false;

  constructor(private httpService: HttpServiceService, private router: Router,
      public authenticationService: AuthenticationService) { 
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
      if (this.currentUser.role != 1 && this.currentUser.role != 2) {
        this.kick();
      }
    }
    else {
      this.kick();
    }
  }
      // ako ne autorizovan ili ne ulogovan korisnik pokusa da pristupi
  // ovoj stranici
  private async kick() {
    await this.delay(3000);
    this.router.navigate(['/log-in']);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit(): void {
    this.httpService.getAction('Plane')
      .toPromise()
      .then(result => {
        this.allPlanes = result as Aeroplane[];
        console.log(this.allPlanes);
      })
      .catch(
        err => {
          console.log(err)
          this.error = true;
          this.errorText = "Error while loading planes!"
        });
  }

  refreshPage() {
    location.reload();
  }

  deletePlane(event) {
    const idDeleteP = event.target.id;
    this.httpService.deleteAction("Plane", "DeletePlane", idDeleteP).toPromise()
    .then(result => {
      this.change = true;
    })
    .catch(
      err => {
        console.log(err);
        this.error = true;
      });
  }

}
