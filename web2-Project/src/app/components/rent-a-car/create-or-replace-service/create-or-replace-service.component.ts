import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { ShareDataServiceService } from 'src/app/services/share-data-service/share-data-service.service';

@Component({
  selector: 'app-create-or-replace-service',
  templateUrl: './create-or-replace-service.component.html',
  styleUrls: ['./create-or-replace-service.component.css']
})
export class CreateOrReplaceServiceComponent implements OnInit {
  service: FormGroup;
  source : string;
  imgName : string;
  isReadOnlyModel: boolean = false;
  isReadOnlyYear: boolean = false;
  isReadOnlyKw: boolean = false;
  isReadOnlyPrice: boolean = false;
  isReadOnlyTrunk: boolean = false;

  numberCars: number;
  numberBranch: number;

  idCars: Array<number>;
  idBranches: Array<number>;

  idService: number;

  constructor(private carService: CarServiceService,
              private shareService: ShareDataServiceService) { 
    this.source = "../../../../assets/img/rent-a-car-logo.jpg";
    this.imgName = "Choose image";
    this.carForm.controls.brand.setValue("Audi");
    this.carForm.controls.type.setValue("Sedan");
    this.carForm.controls.fuel.setValue("Persol");
    this.carForm.controls.gear.setValue("Manual");
    this.carForm.controls.doors.setValue("Four");
    this.carForm.controls.seats.setValue("Five");
    this.carForm.controls.year.setValue("2010");
    this.carForm.controls.kw.setValue("115");
    this.carForm.controls.trunk.setValue("850");
    this.carForm.controls.price.setValue("50");

    this.serviceForm.controls.nav.setValue("10");
    this.serviceForm.controls.bab.setValue("15");
    this.serviceForm.controls.roo.setValue("25");
    this.serviceForm.controls.lux.setValue("20");
    this.serviceForm.controls.dis.setValue("0");


    this.isReadOnlyModel = false;
    this.numberCars = 0;
    this.numberBranch = 0;

    this.idCars = new Array();
    this.idBranches = new Array();

  }
  ngOnInit(): void {

  }

  carForm = new FormGroup({
    brand: new FormControl(),
    model: new FormControl('', [Validators.required]),
    type: new FormControl(),
    roofRack: new FormControl(),
    navigation: new FormControl(),
    babySeat: new FormControl(),
    price: new FormControl(),
    trunk: new FormControl(),
    kw: new FormControl(),
    seats: new FormControl(),
    doors: new FormControl(),
    gear: new FormControl(),
    fuel: new FormControl(),
    year: new FormControl(),
    carImg: new FormControl()
  });

  serviceForm = new FormGroup({
    nameService: new FormControl('', [Validators.required]),
    descriptionService: new FormControl(),
    streetAndNumber: new FormControl(),
    city: new FormControl(),
    country: new FormControl(),
    nav: new FormControl(),
    bab: new FormControl(),
    roo: new FormControl(),
    lux: new FormControl(),
    dis: new FormControl(),
  });

  branchForm = new FormGroup({
    streetAndNumberBranch: new FormControl(),
    cityBranch: new FormControl(),
    countryBranch: new FormControl()
  });

  f(){
    console.log("yyyyyyyyyyyyyy");
    this.carService.getCarServiceId("13").subscribe(
      (res: any) => {
        console.log("ffffffff");
        console.log(res);
      },
      err => {
        console.log("Err: " + err);
        console.log("Err: " + err.statusText);
        console.log("Err: " + err.statusCode);
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  CreateCarSubmit(){
    console.log("submit");//this.form.value
    console.log(this.carForm.value);//
    this.carService.createCar(this.carForm, this.idService).subscribe(
      (res: any) => {
        alert("Uspesno kreiran servis. . .");
        console.log("res: anyyyyyyyyyyyyy");
        console.log(res);
        this.numberCars++;
        //this.idCars.push();
        //this.router.navigateByUrl("/log-in");
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  CreateBranchSubmit(){
    console.log("create branch");
    console.log(this.branchForm);
    this.carService.createBranch(this.branchForm, this.idService).subscribe(
      (res: any) => {
        console.log("res: branch");
        console.log(res);
        this.numberBranch++;
        //this.router.navigateByUrl("/log-in");
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
  }

  OnSubmit(){
    console.log("Create form")
    console.log(this.serviceForm)
    this.carService.createRACService(this.serviceForm).subscribe(
      (res: any) => {
        console.log("res: rac");
        console.log(res);
        this.idService = res.idRAC;
        //this.router.navigateByUrl("/log-in");
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      }
    )
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
        this.shareService.changeRACLogoImage(this.source);
      }
    }
  }

  readURLcar(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      //console.log(event.target.files[0].name);
      //this.imgName = event.target.files[0].name.toString();
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.source = event.target.result.toString();
        var image = document.getElementById("carImg") as HTMLImageElement;
        image.src = this.source;
        this.shareService.changeCarImage(this.source);
      }
    }
  }

  // readURL(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     this.imgString = event.target.files[0].name.toString();
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.source = event.target.result.toString();
  //       this.imgName = this.source;
  //       this.logoImg = this.source;
  //       this.shareService.changeLogoImage(this.source);
  //     }
  //   }
  // }

  deleteProfileImage(){
    this.source = "../../../../assets/img/rent-a-car-logo.jpg";
    this.imgName = "Choose image";
  }

}
