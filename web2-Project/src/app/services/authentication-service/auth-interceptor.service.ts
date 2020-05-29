import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
        const clonedReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        });
        console.log(clonedReq);
        return next.handle(clonedReq).pipe(
            tap(
                succ => { },
                err => {
                    if (err.status == 401){
                        localStorage.removeItem('token');
                        //this.router.navigateByUrl('/user/login');
                        this.router.navigate(['/login']);
                    }
                }
            )
        )
    }
    else
        return next.handle(req.clone());
}
}
