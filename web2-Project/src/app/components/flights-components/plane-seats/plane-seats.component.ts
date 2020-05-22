import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/entities/flight/flight';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { FlightsService } from 'src/app/services/flights-service/flights.service';
import { User } from 'src/app/entities/user/user';
import { PlanSeatServiceService } from 'src/app/services/plain-seat-service/plan-seat-service.service';

@Component({
  selector: 'app-plane-seats',
  templateUrl: './plane-seats.component.html',
  styleUrls: ['./plane-seats.component.css']
})
export class PlaneSeatsComponent implements OnInit {
  currentUser: User;

  success: boolean = false;
  successText: string = "";

  error: boolean = false;
  errorText: string = "";

  change: boolean = false;

  flightId: number = 0;
  flight: Flight;

  loading: boolean = true;

  seats: number = 0; // broj ukupno kliknutih mesta
  private clickedImg: Array<boolean> = new Array<boolean>();
  public numSeats: number = 0;

  loadedFromService: boolean = false;

  constructor(private httpService: HttpServiceService, private router: Router,
    public authenticationService: AuthenticationService, private route: ActivatedRoute,
    private flightsService: FlightsService, private planSeatServiceService: PlanSeatServiceService) {
      if (this.authenticationService.currentUserValue) { 
        this.currentUser = this.authenticationService.currentUserValue;
      }
  }

  refreshPage() {
    location.reload();
  }

  ngOnInit(): void {
    //console.log(this.router.url);
    let routerArr: Array<string> = this.router.url.split('/'); //* /flights/1/flightdetails
    this.route.params.subscribe(params => { this.flightId = params['id']; });
    if (this.flightId == undefined)
            this.flightId = -1;
    else {
      if (routerArr.length === 4) {
        this.flight = this.planSeatServiceService.getFlight();
        this.numSeats = this.flight.allSeatsForThisFlight.length;
        this.loading = false;
        for (let i = 0; i < this.numSeats; i++)
            this.clickedImg.push(false);
        
        this.loadedFromService = true;
      }
      else {
        this.httpService.getIdAction("Flight", this.flightId).toPromise()
        .then(result => {
          this.flight = result as Flight;
          this.numSeats = this.flight.allSeatsForThisFlight.length;
          console.log(this.flight)
          this.loading = false;
          for (let i = 0; i < this.numSeats; i++)
            this.clickedImg.push(false);
        })
        .catch(
          err => {
            console.log(err)
            this.error = true;
            this.errorText = "Error while loading flight!"
            this.loading = false;
          });
      }
    }        
  }

  isSingleClick: boolean = true; 

  checkUncheckSeat(event) {
    this.isSingleClick = true;
    setTimeout(()=>{
      if(this.isSingleClick){
        let selectedId = event.target.id;
        //console.log(selectedId);
        // ako mesto vec nije rezervisano, moze da se rezervise
        // console.log(this.flight.allSeatsForThisFlight[selectedId]);
        if (!this.flight.allSeatsForThisFlight[selectedId].reserved) { 
          let img = document.getElementById(selectedId);
          if (!this.clickedImg[selectedId]) {
            this.clickedImg[selectedId] = true;
            img.style.backgroundColor = 'green';
            ++this.seats;
          }
          else {
            this.clickedImg[selectedId] = false;
            img.style.backgroundColor = 'white';
            --this.seats;
          }
          //console.log(img);
          
        }
        let selectedIdNum = Number.parseInt(selectedId) + 1;
        this.flightsService.setSeatsNumber(this.seats, this.clickedImg, selectedIdNum);
        // console.log('````````````````````````````````````````');
        // console.log(this.seats, this.clickedImg, selectedIdNum);
        // console.log('````````````````````````````````````````');
      }
    },250)
  }

  checkUncheckSeat1(event) {
    let selectedId = event.target.id;
    this.isSingleClick = false;
    if (!this.flight.allSeatsForThisFlight[selectedId].reserved && this.loadedFromService === false) {
      let img = document.getElementById(selectedId);
      if (!this.clickedImg[selectedId]) {
        if (this.currentUser.role == 1 || this.currentUser.role == 2) {
          this.clickedImg[selectedId] = true;
          img.style.backgroundColor = 'gray';
          ++this.seats;
          this.flight.allSeatsForThisFlight[selectedId].isDisabled = true;
        }
      }
      else {
        this.clickedImg[selectedId] = false;
        img.style.backgroundColor = 'white';
        --this.seats;
        if (this.currentUser.role == 1 || this.currentUser.role == 2)
          this.flight.allSeatsForThisFlight[selectedId].isDisabled = false;
      }
    }
    
  }

  createRange(number) {   // simulacija for petlje u html-u
    var items: number[] = [];
    for(var i = 0; i < number; i++){
       items.push(i);
    }
    return items;
  }

  saveChanges() {
    this.httpService.putAction('Flight', this.flight).subscribe (
      res => { 
        this.successText = "Change";
        this.success = true;
        this.error = false;
        this.change = true;
      },
      err => { 
        this.errorText = err; 
        this.error = true; 
        this.success = false;
      });
  }

}
