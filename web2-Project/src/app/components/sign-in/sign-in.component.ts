import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service/register-service.service';
import { ShareDataServiceService } from 'src/app/services/share-data-service/share-data-service.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/entities/user/user';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

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

  // id: string = "";
  currentUserForPUT: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public registerService: RegisterServiceService, 
              private shareService: ShareDataServiceService,
              private route: ActivatedRoute, 
              private httpService: HttpServiceService) {
    this.source = "../../../assets/img/person-icon.png";
    this.imgName = "Nesto";
    this.imgString = "Choose image";
   }
   
  ngOnInit(): void {
    this.registerService.formModel.reset();
    // this.route.params.subscribe(params => { this.id = params['id']; });
    // console.log(this.id)
    // if (this.id != "" && this.id != undefined) {
    //   this.httpService.getUserIdAction("MyUser", this.id).toPromise()
    //   .then(result => {
    //     this.currentUserForPUT = result as User;
        
    //     // this.loading = false;
    //     console.log(this.currentUserForPUT);
    //   })
    //   .catch(
    //     err => {
    //       console.log(err)
    //       // this.error = true;
    //       // this.errorText = "Error while loading company!"
    //       // this.loading = false;
    //     });
    // }
    this.shareService.currentLogoImage.subscribe(logoImg => this.logoImg = logoImg);
  }
 
  OnSubmit(){
    console.log("onSubmit start");
    this.registerService.register().subscribe(
      (res: any) => {
        this.tmpUser  = res;
        //localStorage.setItem('token', res.token);
        //localStorage.setItem('userRole', this.tmpUser.role.toString());
        //localStorage.setItem('currentUser', JSON.stringify(this.tmpUser));
        alert("User created . . . Please login")
        this.router.navigateByUrl("/log-in");
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
