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
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from 'src/app/entities/user/user';

const users: User[] = [
  { 
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com', 
    password: 'admin',
    profileImage: 'string',
    address: {
      streetAndNumber: 'string',
      city: 'string',
      country: 'string'
    }
  },
  { 
    firstName: 'Andrej',
    lastName: 'Kalocanj Mohaci',
    email: 'andrej.km997@gmail.com', 
    password: 'admin',
    profileImage: 'string',
    address: {
      streetAndNumber: 'string',
      city: 'string',
      country: 'string'
    }
  },
  { 
    firstName: 'Marko',
    lastName: 'Misojcic',
    email: 'markomisojcic@gmail.com', 
    password: 'admin',
    profileImage: 'string',
    address: {
      streetAndNumber: 'string',
      city: 'string',
      country: 'string'
    }
  },
  { 
    firstName: 'Test',
    lastName: 'User',
    email: 'user@user.com', 
    password: 'admin',
    profileImage: 'string',
    address: {
      streetAndNumber: 'string',
      city: 'string',
      country: 'string'
    }
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
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImage: user.profileImage,
                address: {
                  streetAndNumber: user.address.streetAndNumber,
                  city: user.address.city,
                  country: user.address.country
                }
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