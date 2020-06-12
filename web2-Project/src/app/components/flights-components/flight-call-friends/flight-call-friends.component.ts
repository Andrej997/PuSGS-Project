import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightsService } from 'src/app/services/flights-service/flights.service';
import { Friend } from 'src/app/entities/friend/friend';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-flight-call-friends',
  templateUrl: './flight-call-friends.component.html',
  styleUrls: ['./flight-call-friends.component.css']
})
export class FlightCallFriendsComponent implements OnInit {
  currentUser: User; // sve se nalazi u currentUser-u
  friendOption: string = 'option1';

  myFriends: Array<User> = new Array<User>();

  constructor(private authenticationService: AuthenticationService, private httpService: HttpServiceService,
      private flightService: FlightsService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    //console.log(this.currentUser);
  }

  ngOnInit(): void {
    this.httpService.getEmailAction('Friend/MyFriends', this.currentUser.email)
      .toPromise()
      .then(result => {
        this.myFriends = result as User[];
        console.log(this.myFriends);
      })
      .catch(
        err => {
          console.log(err)
        });
  }

  use(event) {
    this.friendOption = event.target.id;
  }

  form = new FormGroup({
    friendEmail: new FormControl('', [Validators.required, Validators.email]),
    friendName: new FormControl('', [Validators.required]),
    friendSurname: new FormControl('', [Validators.required]),
    //? friendPassport: new FormControl('', [Validators.required]),
  });

  get f(){
    return this.form.controls;
  }

  private setFriend(user: User) {
    //console.log("flight-call-friend");
    //console.log(user);
    this.flightService.setFriend(user);
  }

  seatBroj: number = 0;
  addedFriendToList: number = 0;

  submit(){
    if (this.friendOption === 'option1') {
      let email = this.form.value.friendEmail;
      let name = this.form.value.friendName;
      let surname = this.form.value.friendSurname;
      let passport = this.form.value.friendPassport;
      let user: User = new User(0, name, surname, email, null, null, null, null, null, null);
      this.setFriend(user);
      this.seatBroj = this.flightService.getSeatBroj();
      this.addedFriendToList = this.flightService.getAddedFriendToList();
    }
  }
  formS = new FormGroup({
    friendSelect: new FormControl([Validators.required]),
    //? friendPassportS: new FormControl('', [Validators.required])
  });

  get fS(){
    return this.formS.controls;
  }
  submitS(){
    if (this.friendOption === 'option2') {
      let friendId = this.formS.value.friendSelect;
      for (let i = 0; i < this.myFriends.length; ++i) {
        if (this.myFriends[i].id.toString() == friendId) {
          this.setFriend(this.myFriends[i]);
        }
      }
      this.seatBroj = this.flightService.getSeatBroj();
      this.addedFriendToList = this.flightService.getAddedFriendToList();
    }
  }
}
