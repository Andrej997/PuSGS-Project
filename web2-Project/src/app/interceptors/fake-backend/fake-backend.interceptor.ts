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

const users: User[] = [
  { 
    id: 1,
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com', 
    password: 'admin',
    profileImage: '\\assets\\img\\user.png',
    address: {
      streetAndNumber: 'string',
      city: 'string',
      country: 'string'
    },
    role: Role.admin,
    friends: new Array<User>(),
    messages: new Array<Message>()
  },
  { 
    id: 2,
    firstName: 'Andrej',
    lastName: 'Kalocanj Mohaci',
    email: 'andrej.km997@gmail.com', 
    password: 'admin',
    profileImage: '\\assets\\img\\user.png',
    address: {
      streetAndNumber: 'Mise Dimitrijevica 1C',
      city: 'Novi Sad',
      country: 'Serbia'
    },
    role: Role.adminA,
    friends: new Array<User>(),
    messages: new Array<Message>()
  },
  { 
    id: 3,
    firstName: 'Marko',
    lastName: 'Misojcic',
    email: 'markomisojcic@gmail.com', 
    password: 'admin',
    profileImage: '\\assets\\img\\user.png',
    address: {
      streetAndNumber: 'string',
      city: 'string',
      country: 'string'
    },
    role: Role.adminM,
    friends: new Array<User>(),
    messages: new Array<Message>()
  },
  { 
    id: 4,
    firstName: 'Test',
    lastName: 'User',
    email: 'user@user.com', 
    password: 'admin',
    profileImage: '\\assets\\img\\user.png',
    address: {
      streetAndNumber: 'string',
      city: 'string',
      country: 'string'
    },
    role: Role.user,
    friends: new Array<User>(),
    messages: new Array<Message>()
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
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImage: user.profileImage,
                address: {
                  streetAndNumber: user.address.streetAndNumber,
                  city: user.address.city,
                  country: user.address.country
                }, 
                role: user.role,
                friends: user.friends,
                messages: user.messages
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