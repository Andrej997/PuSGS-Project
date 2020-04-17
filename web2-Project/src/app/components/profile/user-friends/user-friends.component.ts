import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User, Role } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Address } from 'src/app/entities/address/address';
import { Message } from 'src/app/entities/message/message';
import { Friend } from 'src/app/entities/friend/friend';
import { FriendServiceService } from 'src/app/services/friend-service/friend-service.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  constructor(private authenticationService: AuthenticationService,
      private friendServiceService: FriendServiceService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    //console.log(this.currentUser);
  } 

  ngOnInit(): void { 
    this.scrollToBottom();
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
    if (email != this.currentUser.email) { // ako je user ukucao svoj mail, nece se nista desiti
      let retVal = this.friendServiceService.findUser(email);
      if (retVal === false) {
        this.foundUser = false;
      }
      else {
        this.searchedUser = (retVal as User);
        this.searchedUserName = this.searchedUser.firstName;
        this.searchedUserSurname = this.searchedUser.lastName;
        this.foundUser = true;
        // console.log(this.searchedUser);
      }
    }
  }

  addFriend(): void {
    this.friendServiceService.addUserToMyWaitingList(this.searchedUser);
    this.foundUser = false;
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
