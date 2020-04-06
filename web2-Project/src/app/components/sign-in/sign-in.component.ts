import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Input() source : string;
  imgName : string;

  constructor(private router: Router) {
    this.source = "../../../assets/img/person-icon.png";
    this.imgName = "Choose image";
   }

  ngOnInit(): void {
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

  signIn(): void {
    localStorage.setItem('userRole', JSON.stringify('USER'));

    this.router.navigateByUrl('/home');

  }

}
