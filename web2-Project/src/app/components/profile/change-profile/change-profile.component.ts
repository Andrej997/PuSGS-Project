import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
  currentUser: User;
  currentUserForPUT: User;
  id: string;

  error: boolean = false;
  errorText: string = "";

  imgName: string;
  picture: any;

  success: boolean = false;
  successText: string = "";
  constructor(public authenticationService: AuthenticationService,
      private route: ActivatedRoute, private router: Router, private httpService: HttpServiceService) { 
    if (this.authenticationService.currentUserValue) { 
      this.currentUser = this.authenticationService.currentUserValue;
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
    this.imgName = "Choose image";
    this.route.params.subscribe(params => { this.id = params['id']; });
    if (this.id != this.currentUser.id.toString()) this.kick();
    else {
      this.httpService.getUserIdAction("MyUser", this.id).toPromise()
      .then(result => {
        this.currentUserForPUT = result as User;
        this.form.setValue({
          firstName: this.currentUserForPUT.firstName,
          lastName: this.currentUserForPUT.lastName,
          streetAndNumber: this.currentUserForPUT.address.streetAndNumber,
          city: this.currentUserForPUT.address.city,
          country: this.currentUserForPUT.address.country,
          profileImage: "",
          email: this.currentUserForPUT.email,
          password: "",
          passwordRepeat: "",
          phoneNumber: this.currentUserForPUT.phoneNumber,
          passportNumber: this.currentUserForPUT.passportHash
        })
        this.form.controls["profileImage"].setValidators([]); //* menjamo validator za logo jer ne mora da ga menja
        this.form.controls["profileImage"].updateValueAndValidity(); //* promeni validator dinamicki
        // this.loading = false;
        console.log(this.currentUserForPUT);
      })
      .catch(
        err => {
          console.log(err)
          // this.error = true;
          // this.errorText = "Error while loading company!"
          // this.loading = false;
        });
    }
  }

  form = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    streetAndNumber: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    profileImage: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("",),
    passwordRepeat: new FormControl("",),
    phoneNumber: new FormControl("", [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(8)]),
    passportNumber: new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]),
  });
  
  get f(){
    return this.form.controls;
  }

  submit() {
    if (this.form.value.password == this.form.value.passwordRepeat) {
      this.currentUserForPUT.firstName = this.form.value.firstName;
      this.currentUserForPUT.lastName = this.form.value.lastName;
      this.currentUserForPUT.address.streetAndNumber = this.form.value.streetAndNumber;
      this.currentUserForPUT.address.city = this.form.value.city;
      this.currentUserForPUT.address.country = this.form.value.country;
      if (this.picture != "") this.currentUserForPUT.profileImage = this.picture;
      this.currentUserForPUT.email = this.form.value.email;
      this.currentUserForPUT.password = this.form.value.password;
      this.currentUserForPUT.phoneNumber = this.form.value.phoneNumber;
      this.currentUserForPUT.passportHash = this.form.value.passportNumber;

      // console.log(this.currentUserForPUT)

      this.httpService.putAction('MyUser', this.currentUserForPUT).subscribe (
        res => { 
          this.successText = "You have successfully updated your profile!";
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

  onImg(event) {
    const file = event.target.files[0];
    if (!file) {
      return false;
    }
    if (!file.type.match('image.*')) {
      return false;
    }
    const reader = new FileReader();
    const that = this;
    reader.onload = function (e) {
      that.picture = e.target.result;
      //console.log(that.logo);
    }
    reader.readAsDataURL(file);
  }
}
