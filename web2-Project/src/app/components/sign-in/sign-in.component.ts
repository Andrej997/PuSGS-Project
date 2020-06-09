import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service/register-service.service';
import { ShareDataServiceService } from 'src/app/services/share-data-service/share-data-service.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/entities/user/user';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
//import {AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider} from 'ng4-social-login';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { DOCUMENT } from '@angular/common';

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
  //public user: any = SocialUser;

  // id: string = "";
  currentUserForPUT: User;
  socialProvider = "google";

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public registerService: RegisterServiceService, 
              private shareService: ShareDataServiceService,
              private route: ActivatedRoute, 
              private httpService: HttpServiceService,
              public OAuth: AuthService,
              @Inject(DOCUMENT) private document: Document) {
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
    //console.log("onSubmit start");
    this.registerService.register().subscribe(
      (res: any) => {
        //this.tmpUser  = res;
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
    )
  }
  GoogleRegistration(){
    this.socialProvider = "google";
    this.SocialRegistration();
  }

  FacebookRegistration(){
    this.socialProvider = "facebook";
    this.SocialRegistration();
  }

  SocialRegistration(){
    let socialPlatformProvider;  
    if (this.socialProvider === 'facebook') {  
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
    } 
    else if (this.socialProvider === 'google') {  
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
      //console.log("provider:" + this.socialProvider);
    }  
    //console.log(socialusers);
    console.log("provider:" + this.socialProvider);
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
      console.log(socialusers);   
      localStorage.setItem('socialuser', JSON.stringify(socialusers));

      this.registerService.externalRegister(socialusers).subscribe((res:any)=>{
        alert("Return " + res.uspesno);
        // localStorage.setItem('token', res.token);
         console.log(res.uspesno);  
        this.router.navigateByUrl('/log-in');
      },
      err => {
        console.log("Err: " + err);
        alert(err + "Pokusaj ponovo!");
        this.router.navigateByUrl('/sign-in');
      });
   
    });  
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
