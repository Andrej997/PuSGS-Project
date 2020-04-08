import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service'

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with basic auth credentials if available
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.authdata) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Basic ${currentUser.authdata}`
            }
        });
    }
    return next.handle(request);
  }
}
