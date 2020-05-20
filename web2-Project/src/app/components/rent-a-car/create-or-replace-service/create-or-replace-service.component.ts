import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-or-replace-service',
  templateUrl: './create-or-replace-service.component.html',
  styleUrls: ['./create-or-replace-service.component.css']
})
export class CreateOrReplaceServiceComponent implements OnInit {
  service: FormGroup;
  source : string;
  imgName : string;

  constructor() { 
    this.source = "../../../../assets/img/rent-a-car-logo.jpg";
    this.imgName = "Choose image";
  }

  ngOnInit(): void {
  }

  OnSubmit(){

  }

  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(event.target.files[0].name);
      this.imgName = event.target.files[0].name.toString();

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.source = event.target.result.toString();
        var image = document.getElementById("serviceLogoImg") as HTMLImageElement;
        image.src = this.source;
      }
    }
  }

  deleteProfileImage(){
    this.source = "../../../../assets/img/rent-a-car-logo.jpg";
    this.imgName = "Choose image";
  }

}
