import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User, Role } from 'src/app/entities/user/user';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Message } from 'src/app/entities/message/message';
import { FriendServiceService } from 'src/app/services/friend-service/friend-service.service';
import { Friend } from 'src/app/entities/friend/friend';
import { Address } from 'src/app/entities/address/address';
import { FriendRequest } from 'src/app/entities/friendRequest/friend-request';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  id: string = "";
  currentUser: User;

  usersChar: User = null;

  friends: Array<User> = new Array<User>();
  messages: Array<Message> = new Array<Message>();

  showChat: boolean = false;
  
  constructor(private authenticationService: AuthenticationService,
      private friendServiceService: FriendServiceService, private httpService: HttpServiceService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.id = this.currentUser.id.toString();
    console.log(this.id)
    // console.log(this.currentUser.friends);
  } 

  ngOnInit(): void {
    this.httpService.getEmailAction('Friend/MyFriends', this.currentUser.email)
      .toPromise()
      .then(result => {
        // console.log(result);
        this.friends = result as User[];
        // this.loading = false;
      })
      .catch(
        err => {
          console.log(err)
          // this.error = true;
          // this.errorText = "Error while loading companies!"
          // this.loading = false;
        });
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

  chatWithFriend(id: any): void {
    // console.log(id);
    let text = this.formChat.value.chatText;
    // console.log(text);
    if (text == "" || text == null) return;
    let message = new Message(this.currentUser.id.toString(), text, new Date(), true);
    message.hisId = id;

    this.httpService.postAction('Message', 'SaveMessage', message).subscribe (
      res => { 
        this.loadChat(id);
        //this.waitingForAccept.push(friendRequest.user);
    //     this.successText = postFlightCompany.name + " changes ";
    //     this.success = true;
    //     this.error = false;
      },
      err => { 
        console.log(err);
        // this.errorText = err; 
        // this.error = true; 
        // this.success = false;
      });
  }

  loadChat(id: any): void {
    for (let i = 0; i < this.friends.length; ++i) {
      if (id == this.friends[i].id.toString()) {
        this.usersChar = this.friends[i];
      }
    }
    this.showChat = true;
    let sendId: string = this.currentUser.id + '|' + id;
    this.httpService.getEmailAction('Message', sendId)
    .toPromise()
    .then(result => {
      console.log(result);
      this.messages = result as Message[];
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

}
