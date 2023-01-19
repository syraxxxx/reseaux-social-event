import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService implements CanActivate{

  constructor(private router : Router) { }

  canActivate(): boolean {
    if(localStorage.getItem('token')) this.router.navigateByUrl('/home')
    return true;
  }

  public logout(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('/')
  }
}
