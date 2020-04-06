import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { Address } from 'src/app/entities/address/address';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  @Input() source : string;
  imgName : string;

  constructor(private router: Router) {
    this.source = "../../../assets/img/person-icon.png";
    this.imgName = "Choose image";
   }

   
  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.signInForm = new FormGroup({
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'passwordRepeat' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'phoneNumber' : new FormControl('', [
                                            Validators.required, 
                                            Validators.pattern("^[0-9]*$"),
                                            Validators.minLength(8)]),
      'streetAndNumber': new FormControl("", Validators.required),
      'city': new FormControl("", Validators.required),
      'profileImg': new FormControl("", Validators.nullValidator)

      
    });
  }

  onSubmit() {
    console.log(this.signInForm.value);
    console.log(this.signInForm);

    var address = new Address(this.signInForm.value.streetAndNumber, this.signInForm.value.city, "Srbija");

    var user = new User(this.signInForm.value.firstName, 
                        this.signInForm.value.lastName, 
                        this.signInForm.value.email,
                        this.signInForm.value.password,
                        this.signInForm.value.profileImg,
                        address    );

                        
    console.log(user);

    localStorage.setItem('userRole', JSON.stringify('USER'));

    this.router.navigateByUrl('/home');
  }

  onClear() {
    this.signInForm.reset();
  }
  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(event.target.files[0].name);
      this.imgName = event.target.files[0].name.toString();

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.source = event.target.result.toString();
      }
    }
    //this.source = "../../../assets/img/1.jpg";
  }

  deleteProfileImage(){
    this.source = "../../../assets/img/person-icon.png";
    this.imgName = "Choose image";
  }


}
