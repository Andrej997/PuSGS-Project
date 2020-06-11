import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { Login } from 'src/app/entities/login/login'
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  returnUrl: string;
  error = '';
  socialProvider = "google";
  activatedUser : boolean  = false;
  str: string = "nista";
  myUser = null;
  myToken = null;
  loginModel: Login;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        public OAuth: AuthService,
        private authenticationService: AuthenticationService,
        private loginService: LoginService) {
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  activateUserForm = new FormGroup({
    activateUser: new FormControl('', [Validators.required]),
  });
  get f(){
    return this.form.controls;
  }
  Zatvori(){
    this.activatedUser = false;
    this.router.navigateByUrl('/home');
  }
  activateUserSubmit(){
    console.log("myUser = > " + this.myUser);
    console.log(this.myUser);
    console.log("activateUsersubmit");
    console.log(this.myUser);
    if(this.myUser != null){
      var kod = this.activateUserForm.value;
      console.log(kod.activateUser);
      console.log(this.myUser.activationCode.toString());
      if(kod.activateUser.toString() == this.myUser.activationCode.toString()){
        //this.activatedUser = true;
        if(this.form.value == "" || this.form.value.password == ""){
          console.log("if " + this.form.value);
          console.log(this.form.value);
          console.log(this.form.value.email);
          console.log(this.loginModel);
          this.loginModel = new Login(this.myUser.email, this.myUser.password);
          console.log(this.loginModel);
          //this.loginModel.email = this.myUser.email;
          // this.loginModel.password = this.myUser.password;
        }
        else{
          console.log(this.form.value);
          this.loginModel = this.form.value;
        }
        this.loginService.emailConfirmed(this.loginModel).subscribe((res:any)=>{
          console.log(res);
          alert(res);
          this.activatedUser = true;
          this.authenticationService.login(this.myUser);
          localStorage.setItem('token', this.myToken);
          localStorage.setItem('userRole', this.myUser.role);
          localStorage.setItem('currentUser', JSON.stringify(this.myUser));
          this.myUser = null;
        },
        err => {
          console.log("Err: " + err);
          alert(err + " Nije uspela aktivacija korisnika!");
          this.router.navigateByUrl('/log-in');
        });
      }
      else{
        alert("Ponovi unos!!!!");
      }
    }
    else{
      alert("ponovo!!!!");
    }
  }
  GoogleLogin(){
    this.socialProvider = "google";
    this.SocialLogin();
  }
  FacebookLogin(){
    this.socialProvider = "facebook";
    this.SocialLogin();
  }
  SocialLogin(){
    let socialPlatformProvider;  
    if (this.socialProvider === 'facebook') {  
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
    } 
    else if (this.socialProvider === 'google') {  
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
      //console.log("provider:" + this.socialProvider);
    }  
    console.log("provider:" + this.socialProvider);
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
      console.log(socialusers);   
      localStorage.setItem('socialuser', JSON.stringify(socialusers));

      this.loginService.externalLogin(socialusers).subscribe((res:any)=>{
        console.log("external login");
        console.log(res);
        console.log(res.user);
        this.myUser = res.user;
        this.myToken = res.token;
        console.log("151");
        console.log(this.myUser);
        if(!this.myUser.emailConfirmed)
          this.activatedUser = false;
        else{
          this.activatedUser = true;
          //alert("Uspesno ste se prijavili.. Dobro dosli.. ");
          // localStorage.setItem('token', res.token);
          console.log(res.uspesno);  
          this.authenticationService.login(res.user);
          localStorage.setItem('token', res.token);
          localStorage.setItem('userRole', res.user.role);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          //this.router.navigateByUrl('/home');
        }
      },
      err => {
        console.log("Err: " + err);
        alert(err + " Pokusaj ponovo!");
        this.router.navigateByUrl('/log-in');
      });
    });  
    //this.activatedUser = true;
  }
  submit(){
    this.loginService.login(this.form.value).subscribe(
      (res: any) => {
        console.log(res.user);
        var userr = res.user;
        this.myUser = res.user;
        this.myToken = res.token;
        if(!userr.emailConfirmed)
          this.activatedUser = false;
        else{
          this.activatedUser = true;
          this.authenticationService.login(res.user);
          localStorage.setItem('token', res.token);
          localStorage.setItem('userRole', res.user.role);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          // window.location.reload();
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate(['/home']);
        }
      },
      err => {
        if (err.status == 400)
            alert('Incorrect username or password. Authentication failed.');
        else{
          console.log(err);
          alert(err);
          this.form.reset();
        }
      }
    );
  }
}
