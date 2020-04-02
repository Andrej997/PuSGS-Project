import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Input() source : string;

  constructor() {
    this.source = "../../../assets/img/person-icon.png";
   }

  ngOnInit(): void {
  }

  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.source = event.target.result.toString();
        //alert(this.source);
      }
    }

    // let files = event.target.files;
    // if (files.length > 0) {
    //   var reader = new FileReader();
    //   reader.onload(files[0])
    //   alert(files[0]);
    // }
    //var files = event.srcElement.files;

    // let file = event.target.files[0];
    // let fileName = file.name;
    // console.log(file)
    // console.log(fileName)
    // let formData = new FormData();
    // formData.append('file',file);
    
    //alert(Input);

    this.source = "../../../assets/img/1.jpg";

  }
  // function readURL(input) {
  //   if (input.files && input.files[0]) {
  //       var reader = new FileReader();

  //       reader.onload = function (e) {
  //           $('#blah')
  //               .attr('src', e.target.result);
  //       };

  //       reader.readAsDataURL(input.files[0]);
  //   }


}
