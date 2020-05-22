import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service/register-service.service';
import { ShareDataServiceService } from 'src/app/services/share-data-service/share-data-service.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @Input() source : string;
  imgName : any;
  imgString : string;
  logoImg: string;
  tmpUser: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public registerService: RegisterServiceService, 
              private shareService: ShareDataServiceService) {
    this.source = "../../../assets/img/person-icon.png";
    this.imgName = "Nesto";
    this.imgString = "Choose image";
   }
   
  ngOnInit(): void {
    this.registerService.formModel.reset();
    this.shareService.currentLogoImage.subscribe(logoImg => this.logoImg = logoImg);
  }
 
  OnSubmit(){
    console.log("onSubmit start");
    this.registerService.register().subscribe(
      (res: any) => {
        this.tmpUser  = res;
        //console.log(this.tmpUser);
        //console.log("res: " + res); //treba doraditi da se proveri auth korisnika i logovanje
        //console.log("res: " + res.email); //treba doraditi da se proveri auth korisnika i logovanje
        //localStorage.setItem('token', res.token);
        localStorage.setItem('userRole', this.tmpUser.role.toString());
        localStorage.setItem('currentUser', JSON.stringify(this.tmpUser));
        localStorage.setItem('idCurrentUser', this.tmpUser.id.toString());
        //alert("New user created . .. ")
        this.router.navigateByUrl("/home");
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }

      /* 
      
      if (res.succeeded) {
        this.service.formModel.reset();
        this.toastr.success('New user created!', 'Registration successful.');
      } else {
        res.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Username is already taken','Registration failed.');
              break;

            default:
            this.toastr.error(element.description,'Registration failed.');
              break;
          }
        });
      }
      
      */
    )
  }

  onClear() {
    this.registerService.formModel.reset();
  }

  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.imgString = event.target.files[0].name.toString();
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.source = event.target.result.toString();
        this.imgName = this.source;
        this.logoImg = this.source;
        this.shareService.changeLogoImage(this.source);
      }
    }
  }

  deleteProfileImage(){
    this.source = "../../../assets/img/person-icon.png";
    this.imgString = "Choose image";
  }


}
