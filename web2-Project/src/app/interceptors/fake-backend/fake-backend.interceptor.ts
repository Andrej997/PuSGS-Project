import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, first } from 'rxjs/operators';

import { User, Role } from 'src/app/entities/user/user';
import { Message } from 'src/app/entities/message/message';
import { Address } from 'src/app/entities/address/address';
import { Friend } from 'src/app/entities/friend/friend';
import { FriendRequest } from 'src/app/entities/friendRequest/friend-request';

export const users: User[] = [
  { 
    Id: "",
    id: 1,
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com', 
    password: 'admin',
    profileImage: '\\assets\\img\\user.png',
    address: {
      id: 1,
      streetAndNumber: 'string',
      city: 'string',
      country: 'string',
      deleted: false
    },
    role: Role.admin,
    friends: new Array<Friend>(),
    friendRequests: new Array<FriendRequest>(),
    serviceId: 0,
    passportHash: "",
    phoneNumber: "",
    flightCompany: null,
    bonus: 0
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                Id: user.Id,
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImage: user.profileImage,
                address: {
                  id: user.address.id,
                  streetAndNumber: user.address.streetAndNumber,
                  city: user.address.city,
                  country: user.address.country,
                  deleted: user.address.deleted
                }, 
                role: user.role,
                friends: user.friends,
                friendRequests: user.friendRequests,
                serviceId: user.serviceId,
                phoneNumber: user.phoneNumber,
                passportHash: user.passportHash,
                flightCompany: user.flightCompany,
                bonus: user.bonus
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === `Basic ${window.btoa('admin@admin.com:admin')}`;
        }
  }
}
export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};