import { Injectable } from '@angular/core';
import { Car } from 'src/app/entities/car/car';
import { CardCity } from 'src/app/entities/card-city/card-city';
import { Address }  from 'src/app/entities/address/address';
import { RentACarBranch }  from 'src/app/entities/rent-a-car-branch/rent-a-car-branch';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { stringify } from 'querystring';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShareDataServiceService } from '../share-data-service/share-data-service.service';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';


@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  readonly BaseURI = 'http://localhost:57428/api';
  carImg: string;
  logoImg: string;
  currentUser: User;
  allServices: Array<RentACarService> = new Array<RentACarService>();
  services: Array<RentACarService>;
  
  constructor(private http: HttpClient,
              private shareService: ShareDataServiceService,
              private authenticationService: AuthenticationService) {
    this.shareService.carImage.subscribe(carImg => this.carImg = carImg);
    this.shareService.logoImage.subscribe(logoImg => this.logoImg = logoImg);
    this.currentUser = this.authenticationService.currentUserValue;
    
  }

  createCar(formData, id){
    console.log(formData);
    console.log(id);
    //console.log(this.carImg);
    var b;
    var n;
    var r;
    if(formData.value.babySeat == null)
      b = "";
    else
      b = "true";
    if(formData.value.navigation == null)
      n = "";
    else
      n = "true";
    if(formData.value.roofRack == null)
      r = "";
    else
      r = "true";
    var body = {
      Brand: formData.value.brand,
      Model: formData.value.model,
      Type: formData.value.type,
      RoofRack: r,
      Navigation: n,
      BabySeat: b,
      Price: formData.value.price,
      Trunk: formData.value.trunk,
      Kw: formData.value.kw,
      Seats: formData.value.seats,
      Doors: formData.value.doors,
      Gear: formData.value.gear,
      Fuel: formData.value.fuel,
      Year: formData.value.year,
      CarImg: this.carImg,
      idService: id
    };
    return this.http.post(this.BaseURI + '/Cars/AddCar', body);
  }

  createBranch(formData, id){
    //console.log("car-sevice");
    //console.log(formData);
    var body = {
      streetAndNumber: formData.value.streetAndNumberBranch,
      city: formData.value.cityBranch,
      country: formData.value.countryBranch,
      idService: id
    };
    return this.http.post(this.BaseURI + '/Branch/AddBranch', body);
  }

  createRACService(formData){
    // console.log("rac-sevice");
    // console.log(formData);
    //console.log(this.currentUser.id);
    var body = {
      Name: formData.value.nameService,
      Description: formData.value.descriptionService,
      LogoImage: this.logoImg,
      streetAndNumber: formData.value.streetAndNumber,
      city: formData.value.city,
      country: formData.value.country,
      Navigation: formData.value.nav,
      BabySeat: formData.value.bab,
      Roof: formData.value.roo,
      Luxuary: formData.value.lux,
      Discount: formData.value.dis,
      idAdmin: this.currentUser.id
      
    };
    return this.http.post(this.BaseURI + '/RACService/AddRACS', body);
  }

  loadCars() {

    return this.mockedCars();
  }

  loadCardsCity(){
    return this.mockedCardsCity();
  }

  loadAllCarServices(){
    this.services = new Array<RentACarService>();
    return this.mockedCarServices();
  }

  getCarServices(){
    return this.http.get(this.BaseURI + '/RACService/GetRentACarServices' );
  }
  getCarServiceId(id: string){
    return this.http.get(this.BaseURI + '/RACService/' + id );
  }

  mockedCarServices() {
    let allServices = new Array<RentACarService>();
    var pe = new Address("Yongdingmen Inner St", "Peking", "Kina");
    var sm = new Address("500 W Temple St", "New york", "SAD");
    var ns = new Address("30 Water St", "New york", "SAD"); 
    var tv = new Address("Никитский пер 2,", "Moskva", "Rusija"); 

    var pricelist = new Array<[string, number]>();
    pricelist.push(["babySeat", 2.02])
    pricelist.push(["navigation", 2.3])
    pricelist.push(["roofRack", 5])

    var carlist =  new Array<Car>();
    carlist = this.loadCars(); 
    var branches =  Array<RentACarBranch>();
    var branchSM = new RentACarBranch(sm);
    var branchNS = new RentACarBranch(ns);
    branches.push(branchSM);
    branches.push(branchNS);
    var raiting =  Array<number>();
    var raiting1 =  Array<number>();
    raiting.push(4, 5, 1, 2, 3);
    var avg = this.calculateAvgArray(raiting); 
    raiting1.push(4, 1, 1, 2, 5);
    var avg1 = this.calculateAvgArray(raiting1); 
    var comments = Array<string>();
    comments.push("Komentar1");
    comments.push("Komentar2");
    comments.push("Komentar3");
    var image = "../../../assets/img/rent-a-car-logo.jpg";

    const service1 = new RentACarService(123, 
                                         "Euro car", 
                                         sm, 
                                         "Neki promotivni opis...", 
                                         image,
                                         pricelist, 
                                         carlist, 
                                         branches, 
                                         raiting, 
                                         avg,
                                         comments);
    const service2 = new RentACarService(456,
                                         "Cartize Company", 
                                         ns, 
                                        "Neki promotivni opis...",
                                        image, 
                                        pricelist, 
                                        carlist, 
                                        branches, 
                                        raiting1, 
                                        avg1,
                                        comments);
    const service3 = new RentACarService(789,
                                         "Queen", 
                                         tv, 
                                         "Neki promotivni opis...", 
                                         image,
                                         pricelist, 
                                         carlist, 
                                         branches, 
                                         raiting, 
                                         avg,
                                         comments);
    const service4 = new RentACarService(989,
                                          "Covid19+", 
                                          pe, 
                                          "Neki promotivni opis...", 
                                          image,
                                          pricelist, 
                                          carlist, 
                                          branches, 
                                          raiting, 
                                          avg,
                                          comments);
      
    allServices.push(service1);
    allServices.push(service2);
    allServices.push(service3);
    allServices.push(service4);

    return allServices;
  }
  getServiceOverId(id: number) : RentACarService{
    var allServices = this.loadAllCarServices() as Array<RentACarService>;
    var oneService: RentACarService;
    allServices.forEach(element => {
      if (element.id == id){
        oneService = element;
      }
        
    });
    return oneService;
  }
  
  getService(name: string, city: string) : RentACarService{
    var allServices = this.loadAllCarServices() as Array<RentACarService>;
    var oneService: RentACarService;
    allServices.forEach(element => {
      if (element.name == name && element.address.city == city){
        oneService = element;
      }
        
    });
    return oneService;
  }
  getServicesInCity(city: string): RentACarService[] {
    var allServices = this.loadAllCarServices() as Array<RentACarService>;
    let services = new  Array<RentACarService>();
    
    allServices.forEach(element => {
      if (element.address.city.toString() == city.toString()){
        services.push(element);
        //console.log(element);
      }
      else{
        //console.log("else");
        //console.log(element);

      }
        
    });
    //console.log("gotovo");
    return services;
  }

  mockedCars(): Array<Car> {
    let allCars = new Array<Car>();
    var audi = "../../../assets/img/2020-audi-rs6-avant.jpg";
    var ford = "../../../assets/img/mustang.jpg";
    var vw = "../../../assets/img/vw-scirocco.jpg";

    var raiting =  Array<number>();
    var raiting1 =  Array<number>();
    var raiting2 =  Array<number>();
    raiting.push(5, 1);
    raiting1.push(4, 2, 5);
    raiting2.push(4, 1, 5, 2, 5);
    var avg = this.calculateAvgArray(raiting); 
    var avg1 = this.calculateAvgArray(raiting1); 
    var avg2 = this.calculateAvgArray(raiting2); 


    const car1 = new Car(1, 
                         audi, 
                         "Audi", 
                         "RS6", 
                         "Avant", 
                         4000,
                         300, 
                         5, 
                         "Automatic", 
                         "Persol", 
                         2020,  
                         5, 
                         5, 
                         800, 
                         999, 
                         raiting, 
                         avg,
                         true,
                         true,
                         true);
    const car2 = new Car(2, 
                         ford, 
                         "Ford",
                        "Mustang GT", 
                        "Supercar", 
                        5000,
                        400, 
                        3, 
                        "Manual",  
                        "Diesel", 
                        2020, 
                        2, 
                        2, 
                        200, 
                        899, 
                        raiting1, 
                        avg1,
                        false,
                        true,
                        false);
    const car3 = new Car(3, 
                         vw,  
                         "Volkswagen", 
                         "Scirocco", 
                         "Hatchback", 
                         2000,
                         200, 
                         3, 
                         "Manual", 
                         "Persol",
                         2020, 
                         4, 
                         4, 
                         300, 
                         799, 
                         raiting2, 
                         avg2,
                         true,
                         true,
                         false);
    
    allCars.push(car1);
    allCars.push(car2);
    allCars.push(car3);

    return allCars;
  }
  mockedCardsCity(): Array<CardCity> {
    let allCards = new Array<CardCity>();
    // let ny = new Array<string>();
    // let ny1 = new Array<string>();
    // let ny2 = new Array<string>();
    // ny.push("../../../assets/img/new york.jpg");
    // ny.push("../../../assets/img/los angeles.jpg");

    // ny1.push("../../../assets/img/peking.jpg");
    // ny1.push("../../../assets/img/new york.jpg");

    // ny2.push("../../../assets/img/moskva.jpg");
    // ny2.push("../../../assets/img/los angeles.jpg");
   

    this.http.get(this.BaseURI + '/City' ).subscribe((res:any)=>{
      //alert("Return " + res);
      console.log(res);
      res.forEach(element => {
        let ny = new Array<string>();
        ny.push(element.images);
        ny.push(element.images);
        const card = new CardCity(element.city, element.description, ny);
        //console.log("elementttttttt");
        //console.log(element);
        console.log(card);
        allCards.push(card);
      },
      err => {
        console.log("Err: " + err);
        alert(err);
      });

    });




    // const card1 = new CardCity("New york", "Neki opis ovde stoji..xD", ny);
    // const card2 = new CardCity("Peking", "Neki opis i ovde stoji..xD", ny1);
    // const card4 = new CardCity("Moskva", "Neki opis i ovde stoji..xD", ny2);

    // allCards.push(card1);
    // allCards.push(card2);
    // allCards.push(card4);

    return allCards;
  }

  calculateAvgArray(votes: Array<number>) : number{
    var sum = 0;
    var numberVote = 0;
    var averageRating = 0;
    votes.forEach(element => {
      sum += element;
    });
    numberVote = votes.length;

    averageRating =  sum / numberVote;

    return averageRating;
  }

  calculateAvg(service: RentACarService) : number{
    var sum = 0;
    var numberVote = 0;
    var averageRating = 0;
    service.raiting.forEach(element => {
      sum += element;
    });
    numberVote = service.raiting.length;

    averageRating =  sum / numberVote;

    return averageRating;
  }
}
