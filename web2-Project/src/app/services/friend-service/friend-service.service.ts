import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { User } from 'src/app/entities/user/user';
import { users } from 'src/app/interceptors/fake-backend/fake-backend.interceptor'
import { Friend } from 'src/app/entities/friend/friend';
import { Message } from 'src/app/entities/message/message';
import { HttpServiceService } from '../http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class FriendServiceService {
  allUsers: Array<User> = users;
  currentUser: User;
  foundedUser: User;
  constructor(private authenticationService: AuthenticationService, private httpService: HttpServiceService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    //console.log(this.allUsers);
  }

  acceptFriend(friendEmail: string) {
    // rucno dodavanje usera usled nedostatka beckenda
    // let breakFor = false;
    // for (let i = 0; i < this.allUsers.length; ++i) {
    //   if (breakFor) {
    //     break;
    //   }
    //   if (this.allUsers[i].email === this.currentUser.email) {
    //     for (let j = 0; j < this.allUsers[i].friendRequests.length; ++j) {
    //       if (this.allUsers[i].friendRequests[j].email === friendEmail) {
    //         let friend = new Friend(
    //           this.allUsers[i].friendRequests[j], 
    //           new Array<Message>(
    //             new Message(
    //               this.allUsers[i].friendRequests[j].firstName,
    //               "Thanks for adding me!",
    //               new Date(),
    //               true
    //             )));
    //         this.allUsers[i].friends.push(friend);
    //         this.allUsers[i].friendRequests.splice(j, 1);
    //         breakFor = true;
    //         break;
    //       }
    //     }
    //   }
    // }

    // for (let i = 0; i < this.currentUser.friendRequests.length; ++i) {
    //   if (this.currentUser.friendRequests[i].email === friendEmail) {
    //     let friend = new Friend(
    //       this.currentUser.friendRequests[i],
    //       new Array<Message>(
    //         new Message(
    //           this.currentUser.friendRequests[i].firstName,
    //           "Thanks for adding me!",
    //           new Date(),
    //           true
    //         ))); 
    //     this.currentUser.friends.push(friend);
    //     this.currentUser.friendRequests.splice(i, 1);
    //     break;
    //   }
    // }
    //console.log(this.allUsers);
  }

  declineFriend(friendEmail: string) {
    // rucno izbacivanje usera usled nedostatka beckenda
    // let breakFor = false;
    // for (let i = 0; i < this.allUsers.length; ++i) {
    //   if (breakFor) {
    //     break;
    //   }
    //   if (this.allUsers[i].email === this.currentUser.email) {
    //     for (let j = 0; j < this.allUsers[i].friendRequests.length; ++j) {
    //       if (this.allUsers[i].friendRequests[j].email === friendEmail) {
    //         this.allUsers[i].friendRequests.splice(j, 1);
    //         breakFor = true;
    //         break;
    //       }
    //     }
    //   }
    // }

    // for (let i = 0; i < this.currentUser.friendRequests.length; ++i) {
    //   if (this.currentUser.friendRequests[i].email === friendEmail) {
    //     this.currentUser.friendRequests.splice(i, 1);
    //     break;
    //   }
    // }
    //console.log(this.allUsers);
  }

  findUser(userEmail: string): any {
    this.httpService.getEmailAction("Friend", userEmail).toPromise()
    .then(result => {
      this.foundedUser = result as User;
      // console.log('------------');
      // console.log(this.foundedUser);
      // console.log('------------');
      return this.foundedUser;
    })
    .catch(
      err => {
        console.log(err)
        return false;
        // this.error = true;
        // this.errorText = "Error while loading company!"
        // this.loading = false;
      });
  }

  addUserToMyWaitingList(user: User) {
    // this.currentUser.waitingForAccept.push(user);
    // // posto jos nemamo backend moramo rucno kod nas ubaci tog korisnika 
    // for (let i = 0; i < this.allUsers.length; ++i) { 
    //   if (this.currentUser.email === this.allUsers[i].email) {
    //     this.allUsers[i].waitingForAccept.push(user);
    //     break;
    //   }
    // }
    // // ubaci kod tog user-a mene u njegovu listu zahteva
    // for (let i = 0; i < this.allUsers.length; ++i) { 
    //   if (user.email === this.allUsers[i].email) {
    //     this.allUsers[i].friendRequests.push(this.currentUser);
    //     break;
    //   }
    // }
    //console.log(this.allUsers);
  }

  deleteFriend(email: string) {
    // rucno izbacivanje usera usled nedostatka beckenda
    // let breakFor = false;
    // for (let i = 0; i < this.allUsers.length; ++i) {
    //   if (breakFor) {
    //     break;
    //   }
    //   if (this.allUsers[i].email === this.currentUser.email) {
    //     for (let j = 0; j < this.allUsers[i].friends.length; ++j) {
    //       if (this.allUsers[i].friends[j].friend.email === email) {
    //         this.allUsers[i].friends.splice(j, 1);
    //         breakFor = true;
    //         break;
    //       }
    //     }
    //   }
    // }

    // for (let i = 0; i < this.currentUser.friends.length; ++i) {
    //   if (this.currentUser.friends[i].friend.email === email) {
    //     this.currentUser.friends.splice(i, 1);
    //     break;
    //   }
    // }
    //console.log(this.allUsers);
  }

  saveMessage(email: string, message: Message): void {
    // let breakFor = false;
    // for (let i = 0; i < this.allUsers.length; ++i) {
    //   if (breakFor) {
    //     break;
    //   }
    //   if (this.allUsers[i].email === this.currentUser.email) {
    //     for (let j = 0; j < this.allUsers[i].friends.length; ++j) {
    //       if (this.allUsers[i].friends[j].friend.email === email) {
    //         this.allUsers[i].friends[j].messages.push(message);
    //         breakFor = true;
    //         break;
    //       }
    //     }
    //   }
    // }

    // for (let i = 0; i < this.currentUser.friends.length; ++i) {
    //   if (this.currentUser.friends[i].friend.email === email) {
    //     this.currentUser.friends[i].messages.push(message);
    //     break;
    //   }
    // }
    // console.log(this.allUsers);
  }
}
