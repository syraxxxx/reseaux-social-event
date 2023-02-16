import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UtilisateurService} from "../../@core/services/utilisateur.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate{

  constructor(
    private router: Router,
    private userService : UtilisateurService
  ) { }

  canActivate(): boolean {
    if(!localStorage.getItem('token')) this.router.navigateByUrl('/')
    return true;
  }
  canActivateAdmin(): boolean {
    if(!localStorage.getItem('token')) this.router.navigateByUrl('/')
    return true;
  }

  public login(token: string) {
    localStorage.setItem('token', token);

    this.userService.getUserByToken().subscribe(response=>{
      if(response.user[0].admin==1){
        this.router.navigateByUrl('/admin')
      }else{
        this.router.navigateByUrl('/home')
      }
    })

  }
}
