import { Injectable } from '@angular/core';
import { Validators, FormGroup, FormControl, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ShareDataServiceService } from '../share-data-service/share-data-service.service';
import * as CryptoJS from 'crypto-js';
import { HttpServiceService } from '../http-service/http-service.service';
import { User } from 'src/app/entities/user/user';

@Injectable({ 
  providedIn: 'root'
})

export class RegisterServiceService {

  userId: string;
  logoImg: string;
  readonly BaseURI = 'http://localhost:57428/api';

  constructor(private route: ActivatedRoute, 
              private http: HttpClient, 
              private shareService: ShareDataServiceService,
              private httpService: HttpServiceService) {
    this.shareService.currentLogoImage.subscribe(logoImg => this.logoImg = logoImg);
   }

  formModel = new FormGroup({
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'passwordRepeat' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'phoneNumber' : new FormControl('', [
                                            Validators.pattern("^[0-9]*$"),
                                            Validators.minLength(8)
                                          ]),
      'streetAndNumber': new FormControl('', ), //Validators.required
      'city': new FormControl('', ), //Validators.required
      'profileImage': new FormControl('', Validators.nullValidator),
      'country': new FormControl('', ),
      'passportNumber': new FormControl('', [Validators.minLength(9), 
                                             Validators.maxLength(9),
                                             Validators.pattern("^[0-9]*$")])
    });

    // putUser(user: User) {
    //   this.formModel.setValue(
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     password: user.password,
    //     passwordRepeat: user.password,
    //     phoneNumber: user.phoneNumber,
    //     streetAndNumber: user.address.streetAndNumber,
    //     city: user.address.city,
    //     profileImage: user.profileImage,
    //     country: user.address.country,
    //     passportNumber: user.passportHash
    //   );
    // }

    register() {
      var key = CryptoJS.enc.Utf8.parse('8080808080808080');  
      var iv = CryptoJS.enc.Utf8.parse('8080808080808080'); 
      var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.formModel.value.password), key,  
                {  
                    keySize: 128 / 8,  
                    iv: iv,  
                    mode: CryptoJS.mode.CBC,  
                    padding: CryptoJS.pad.Pkcs7  
                }); 

      console.log(encryptedpassword.toString());

      var body = {
        FirstName: this.formModel.value.firstName,
        LastName: this.formModel.value.lastName,
        Email: this.formModel.value.email,
        Password: encryptedpassword.toString(),
        ProfileImage: this.logoImg,
        StreetAndNumber: this.formModel.value.streetAndNumber,
        City: this.formModel.value.city,
        Country: this.formModel.value.country,
        PhoneNumber: this.formModel.value.phoneNumber,
        RoleRole: "registredUser",
        PassportNumber: this.formModel.value.passportNumber
      };
      //readonly BaseURI = 'http://localhost:57428/api';
      return this.http.post(this.BaseURI + '/MyUser/Register', body);
    }
  
  
    
    // ComparePassword(controlName: string, matchingControlName: string) :ValidatorFn {
    //   return{ controlName === matchingControlName}
      //return (formGroup: FormGroup) => {
        // const control = formGroup.controls[controlName];
        // const matchingControl = formGroup.controls[matchingControlName];
    
        // if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        //   return;
        // }
    
        // if (control.value !== matchingControl.value) {
        //   matchingControl.setErrors({ mustMatch: true });
        // } else {
        //   matchingControl.setErrors(null);
        // }
      //};
    //}

  // formModel = this.formBuilder.group({
  //   'firstName': ['', Validators.required],
  //   'lastName': ['', Validators.required],
  //   'email': ['', Validators.email, , Validators.email],
  //   Passwords: this.formBuilder.group({
  //     'password': ['', [Validators.required, Validators.minLength(5)]],
  //     'passwordRepeat': ['', Validators.required]
  //   }, { validator: this.comparePasswords }),
  //   'phoneNumber': ['', Validators.pattern("^[0-9]*$"), Validators.minLength(8)],
  //   'streetAndNumber': ['', Validators.required],
  //   'city': ['', Validators.required],
  //   'profileImg': ['', Validators.required],
    //'country': ['', Validators.required],
    //
    // 'firstName': new FormControl("", Validators.required),
    // 'lastName': new FormControl("", Validators.required),
    // 'email': new FormControl('', [Validators.required, Validators.email]),
    // 'password' : new FormControl('', [Validators.required, Validators.minLength(3)]),
    // 'passwordRepeat' : new FormControl('', [Validators.required, Validators.minLength(3)]),
    // 'phoneNumber' : new FormControl('', [
    //                                       // Validators.required, 
    //                                       Validators.pattern("^[0-9]*$"),
    //                                       Validators.minLength(8)]),
    // 'streetAndNumber': new FormControl("", Validators.required),
    // 'city': new FormControl("", Validators.required),
    // 'profileImg': new FormControl("", Validators.nullValidator)

    //
  //});
    
  // comparePasswords(fb: FormGroup) {
  //   console.log("stigao do compare passwords");
  //   let confirmPswrdCtrl = fb.get('passwordRepeat');
  //   //passwordMismatch
  //   //confirmPswrdCtrl.errors={passwordMismatch:true}
  //   if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
  //     if (fb.get('password').value != confirmPswrdCtrl.value)
  //       confirmPswrdCtrl.setErrors({ passwordMismatch: true });
  //     else
  //       confirmPswrdCtrl.setErrors(null);
  //   }
  // }


  //retrun all users
      // this.http.get(this.BaseURI + '/MyUser/GetUsers')
      //     .toPromise()
      //     .then(result => {
      //       console.log(result);
      //       var users = result as User[];
      //       //console.log("Users all: " + users);
      //       this.userId = users[0].id.toString();
      //       //console.log("User id: " + this.userId);
      //     })
      //     .catch(
      //       err => {
      //         console.log(err)
      //       });
      //vraca jednog usera, prosledjuje mu se id koji se kreira prilikom upisa u bazu  
      // this.http.get(this.BaseURI + '/MyUser/19551dc8-972f-43d4-83ee-7c6439267702') //ovaj string je id usera, ovde jos uvek ne mogu da ga dobavim pa je stavljeno samo za probu
      //       .toPromise()
      //       .then(result => {
      //         //console.log("Result: " + result);
      //         var user = result as User;
      //         console.log("User: " + user);
      //       })
      //       .catch(
      //         err => {
      //           console.log(err)
      //         });
      
      //za update usera, moze se iskoristit i za brisanje        
      // var idUserstr = '19551dc8-972f-43d4-83ee-7c6439267702';
      // this.http.put(this.BaseURI + '/MyUser',  idUserstr).toPromise()
      //       .then(result => {
      //         //console.log("Result: " + result);
      //         var user = result as User;
      //         console.log("User: " + user);
      //       })
      //       .catch(
      //         err => {
      //           console.log(err)
      //         });

  

 

}
