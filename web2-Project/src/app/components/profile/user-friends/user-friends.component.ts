import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User, Role } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Address } from 'src/app/entities/address/address';
import { Message } from 'src/app/entities/message/message';
import { Friend } from 'src/app/entities/friend/friend';
import { FriendServiceService } from 'src/app/services/friend-service/friend-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  foundUser: boolean = false;
  searchedUser: User;
  searchedUserName: string = '';
  searchedUserSurname: string = '';

  currentUser: User;

  waitingForAccept: Array<User> = new Array<User>();

  constructor(public authenticationService: AuthenticationService, private router: Router,
      private friendServiceService: FriendServiceService, private httpService: HttpServiceService) {
    if (this.authenticationService.currentUserValue) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      console.log(this.currentUser);
    }
    else {
      this.kick();
    }
    //console.log(this.currentUser);
  } 

  private async kick() {
    await this.delay(3000);
    this.router.navigate(['/log-in']);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit(): void { 
    this.scrollToBottom();
    this.httpService.getEmailAction('Friend/Awu', this.currentUser.email)
      .toPromise()
      .then(result => {
        this.waitingForAccept = (result as User).waitingForAccept;
        // console.log(this.waitingForAccept);
        // this.loading = false;
      })
      .catch(
        err => {
          console.log(err)
          // this.error = true;
          // this.errorText = "Error while loading companies!"
          // this.loading = false;
        });
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  

  accept(email: string) {
    this.friendServiceService.acceptFriend(email);
  }

  decline(email: string) {
    this.friendServiceService.declineFriend(email);
  }

  form = new FormGroup({
    email: new FormControl()
  });
  
  get f(){
    return this.form.controls;
  }

  searchUser() {
    let email = this.form.value.email;
    this.httpService.getEmailAction("Friend", email).toPromise()
    .then(result => {
      this.searchedUser = result as User;
      this.foundUser = true;
      this.searchedUserName = this.searchedUser.firstName;
      this.searchedUserSurname = this.searchedUser.lastName;
      //console.log(this.searchedUser)
    })
    .catch(
      err => {
        console.log(err)
        this.foundUser = true;
        // this.error = true;
        // this.errorText = "Error while loading company!"
        // this.loading = false;
      });
  }

  addFriend(): void {
    if (this.currentUser.waitingForAccept == (null || undefined)) {
      this.currentUser.waitingForAccept = new Array<User>();
      this.currentUser.waitingForAccept.push(this.searchedUser)
    }
    else
      this.currentUser.waitingForAccept.push(this.searchedUser)
    //this.friendServiceService.addUserToMyWaitingList(this.searchedUser);
    this.httpService.putAction('Friend/AddToWL', this.currentUser).subscribe (
      res => { 
    //     this.successText = postFlightCompany.name + " changes ";
    //     this.success = true;
    //     this.error = false;
           this.foundUser = false;
      },
      err => { 
        console.log(err);
        // this.errorText = err; 
        // this.error = true; 
        // this.success = false;
      });
  }

  cancelAdd(): void {
    this.foundUser = false;
  }

  deleteFriend(email: string): void {
    this.friendServiceService.deleteFriend(email);
  }

  formChat = new FormGroup({
    chatText: new FormControl()
  });
  
  get fChat(){
    return this.formChat.controls;
  }

  chatWithFriend(email: string): void {
    let text = this.formChat.value.chatText;
    let message = new Message(this.currentUser.firstName, text, new Date(), true);
    this.friendServiceService.saveMessage(email, message);
  }
}
