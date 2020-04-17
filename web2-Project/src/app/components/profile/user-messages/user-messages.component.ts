import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User, Role } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Message } from 'src/app/entities/message/message';
import { FriendServiceService } from 'src/app/services/friend-service/friend-service.service';
import { Friend } from 'src/app/entities/friend/friend';
import { Address } from 'src/app/entities/address/address';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  currentUser: User;

  usersChar: Friend;
  
  constructor(private authenticationService: AuthenticationService,
      private friendServiceService: FriendServiceService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser.friends);
  } 

  ngOnInit(): void {
    this.usersChar = new Friend(
      new User(
        0,"","","","","",new Address("","",""),Role.user, new Array<Friend>(), new Array<User>(), new Array<User>()
      ),
      new Array<Message>());
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

  loadChat(email: string): void {

    for (let i = 0; i < this.currentUser.friends.length; ++i) {
      if (this.currentUser.friends[i].friend.email === email) {
        this.usersChar = this.currentUser.friends[i];
        console.log(this.usersChar.friend.id);
        break;
      }
    }
  }

}
