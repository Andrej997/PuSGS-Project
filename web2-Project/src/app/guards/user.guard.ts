import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = JSON.parse(localStorage.getItem('userRole'));
    if (userRole === 'USER') {
      return true;
    }
      
    alert('Da biste pristupili ovom linku, morate imati ulogu korisnika!');
    return ;
  }
  
}
