import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Aeroplane } from 'src/app/entities/aeroplane/aeroplane';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvioSediste } from 'src/app/entities/avio-sediste/avio-sediste';

@Component({
  selector: 'app-create-plane',
  templateUrl: './create-plane.component.html',
  styleUrls: ['./create-plane.component.css']
})
export class CreatePlaneComponent implements OnInit {
  currentUser: User;
  plane: Array<Aeroplane>;

  changePlane: Aeroplane;

  success: boolean = false;
  successText: string = "";

  error: boolean = false;
  errorText: string = "";

  planeId: number = 0;
  isIt: boolean = false;

  constructor(private httpService: HttpServiceService, private router: Router,
      public authenticationService: AuthenticationService, private route: ActivatedRoute) {
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
    this.route.params.subscribe(params => { this.planeId = params['id']; });
    if (this.planeId == undefined)
            this.planeId = -1;
    else {
      this.httpService.getIdAction("Plane", this.planeId).toPromise()
        .then(result => {
          this.changePlane = result as Aeroplane;
          this.form.setValue({
            name: this.changePlane.name,
            numSeats: this.changePlane.numSeats
          })
          this.form.controls["numSeats"].setValidators([]); //* menjamo validator za logo jer ne mora da ga menja
          this.form.controls["numSeats"].updateValueAndValidity(); //* promeni validator dinamicki
          this.isIt = true;
        })
        .catch(
          err => {
            console.log(err)
            this.error = true;
            this.errorText = "Error while loading company!"
          });
    }
  }

  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    numSeats: new FormControl([Validators.required, Validators.min(1)])
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit() {
    if (this.planeId === -1) {
      let name = this.form.value.name;
      let numSeats = this.form.value.numSeats;
      let allSeats: Array<AvioSediste> = new Array<AvioSediste>();
  
      for (let i = 0; i < numSeats; ++i) {
        let newSeat = new AvioSediste(0, false, false);
        allSeats.push(newSeat);
      }
  
      let aeroplane = new Aeroplane(0, name, numSeats, allSeats);
  
      this.httpService.postAction('Plane', 'AddPlane', aeroplane).subscribe(
        res => { 
          this.form.reset(); 
          this.successText = aeroplane.name;
          this.success = true;
          this.error = false;
        },
        err => { 
          this.errorText = err; 
          this.error = true; 
          this.success = false;
        });
    }
    else {
      this.changePlane.name = this.form.value.name;
      this.httpService.putAction('Plane', this.changePlane).subscribe (
        res => { 
          this.successText = "Change";
          this.success = true;
          this.error = false;
        },
        err => { 
          this.errorText = err; 
          this.error = true; 
          this.success = false;
        });
    }
  }
}
