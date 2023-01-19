import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(): boolean {
    if(!localStorage.getItem('token')) this.router.navigateByUrl('/')
    return true;
  }

  public login(token: string) {
    localStorage.setItem('token', token)
    this.router.navigateByUrl('/home')
  }
}
