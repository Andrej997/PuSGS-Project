import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StringForICollection } from 'src/app/entities/StringForICollection/string-for-icollection';

@Component({
  selector: 'app-accept-reservation',
  templateUrl: './accept-reservation.component.html',
  styleUrls: ['./accept-reservation.component.css']
})
export class AcceptReservationComponent implements OnInit {

  error: boolean = false;
  errorText: string = "";

  success: boolean = false;
  successText: string = "";

  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    invitationString: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
  });
  
  get f(){
    return this.form.controls;
  }

  submit() {

    let invitationString: StringForICollection = new StringForICollection();
    invitationString.PlainString = this.form.value.invitationString;

    this.httpService.postAction('FlightReservation', 'Accept', invitationString).subscribe(
      res => { 
        this.successText = "Thank you for accepting this invitation!";
        this.success = true;
        this.error = false;
      },
      err => { 
        this.errorText = err; 
        this.error = true; 
        this.success = false;
      });
  }

  decline() {
    let invitationString: StringForICollection = new StringForICollection();
    invitationString.PlainString = this.form.value.invitationString;
    this.httpService.deleteTypeAction("FlightReservation", "Decline", invitationString.PlainString).toPromise()
    .then(result => {
      this.successText = "Thank you for declining this invitation!";
      this.success = true;
      this.error = false;
    })
    .catch(
      err => {
        console.log(err);
        this.error = true;
        this.errorText = err; 
      });
  }

}
