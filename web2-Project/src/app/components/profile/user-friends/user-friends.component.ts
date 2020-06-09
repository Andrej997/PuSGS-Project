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
import { FriendRequest } from 'src/app/entities/friendRequest/friend-request';

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

  friendRequests: Array<FriendRequest> = new Array<FriendRequest>();
  friendRequestsAccept: Array<User> = new Array<User>();
  waitingForAccept: Array<User> = new Array<User>();
  friends: Array<User> = new Array<User>();

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
    this.loadLists();
  }

  loadLists() {
    this.httpService.getEmailAction('Friend/Fru', this.currentUser.email)
    .toPromise()
    .then(result => {
      this.friendRequestsAccept = result as User[];
      // this.loading = false;
    })
    .catch(
      err => {
        console.log(err)
        // this.error = true;
        // this.errorText = "Error while loading companies!"
        // this.loading = false;
      });
    this.httpService.getEmailAction('Friend/MyFriends', this.currentUser.email)
      .toPromise()
      .then(result => {
        console.log(result);
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
  this.httpService.getEmailAction('Friend/Awu', this.currentUser.email)
    .toPromise()
    .then(result => {
      this.waitingForAccept = result as User[];
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

  

  accept(id: string) {
    let sendId: string = this.currentUser.id + '|' + id;
    // console.log(sendId);
    this.httpService.deleteUserIdAction('Friend', "AddFriend", sendId).subscribe (
      res => { 
        //* ako PUT prodje, obrisi te zahteve za prijateljstvo
        this.decline(id);
      },
      err => { 
        console.log(err);
        // this.errorText = err; 
        // this.error = true; 
        // this.success = false;
      });
  }

  decline(id: string) {
    // this.friendServiceService.declineFriend(email);
    let sendId: string = this.currentUser.id + '|' + id;
    // console.log(sendId)
    this.httpService.deleteUserIdAction("Friend", "DeleteFriendRequest", sendId).toPromise()
    .then(result => {
      // this.loading = false;
      this.loadLists();
    })
    .catch(
      err => {
        // this.loading = false;
        console.log(err);
        // this.error = true;
        // this.hideShowBTN = false;
      });
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
    // if (this.currentUser.waitingForAccept == (null || undefined)) {
    //   this.currentUser.waitingForAccept = new Array<User>();
    //   this.currentUser.waitingForAccept.push(this.searchedUser)
    // }
    // else
    let friendRequest = new FriendRequest();
    friendRequest.id = 0;
    friendRequest.myId = this.currentUser.id.toString();
    friendRequest.hisId = this.searchedUser.id.toString();
    friendRequest.isRequest = false;
    console.log(this.currentUser);
    this.currentUser.friendRequests.push(friendRequest)
    //this.friendServiceService.addUserToMyWaitingList(this.searchedUser);
    this.httpService.postAction('Friend', 'SendReq', friendRequest).subscribe (
      res => { 
        //this.waitingForAccept.push(friendRequest.user);
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

  deleteFriend(id: string): void {
    let sendId: string = this.currentUser.id + '|' + id;
    // this.friendServiceService.deleteFriend(email);
    this.httpService.deleteUserIdAction("Friend", "DeleteFriend", sendId).toPromise()
    .then(result => {
      // this.loading = false;
      this.loadLists();
    })
    .catch(
      err => {
        // this.loading = false;
        console.log(err);
        // this.error = true;
        // this.hideShowBTN = false;
      });
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
