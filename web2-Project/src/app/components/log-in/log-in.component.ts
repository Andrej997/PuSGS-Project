import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { Login } from 'src/app/entities/login/login'
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

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
        private authenticationService: AuthenticationService) {
    
    //console.log(this.authenticationService.currentUserValue);
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
      //console.log(router);
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    let user = new Login(this.form.value.email, this.form.value.password);
    //localStorage.setItem('currentUser', JSON.stringify(user.email.toString()));
    //console.log(user);
    
    this.authenticationService.login(user.email.toString(), user.password.toString())
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                });
  }
}
