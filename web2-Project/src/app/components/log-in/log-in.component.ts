import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { Login } from 'src/app/entities/login/login'
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  returnUrl: string;
  error = '';

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private loginService: LoginService) {
    
    //console.log(this.authenticationService.currentUserValue);
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
      //console.log(router);
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
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    this.loginService.login(this.form.value).subscribe(
      (res: any) => {
        console.log(res);
        console.log(res.token);
        console.log(res.user);
        this.authenticationService.login(res.user);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userRole', res.user.role);
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == 400)
            alert('Incorrect username or password. Authentication failed.');
          //this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else{
          console.log(err);
          alert(err);
          this.form.reset();
        }
      }
    );













    //let user = new Login(this.form.value.email, this.form.value.password);
    //localStorage.setItem('currentUser', JSON.stringify(user.email.toString()));
    //console.log(user);
    
    // this.authenticationService.login(user.email.toString(), user.password.toString())
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 this.error = error;
    //             });
  }
}
