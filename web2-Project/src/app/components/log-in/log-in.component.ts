import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { Login } from 'src/app/entities/login/login'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    var user = new Login(this.form.value.email, this.form.value.password);
    console.log(user);
  }
}
