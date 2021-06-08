import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class AuthGuardGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');
    // return true if you want to navigate, otherwise return false
    let token = localStorage.getItem('Authorization')
    console.log(route)
    console.log(state)
    if(token){
      return true;
    }
    return false;
  }
}
