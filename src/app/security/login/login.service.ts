import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UtilisateurService} from "../../@core/services/utilisateur.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  constructor(
    private router: Router,
    private userService: UtilisateurService
  ) {
  }

  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/')
    }
    this.userService.getUserByToken().subscribe(response => {
      if (response.user[0].admin == 1) {
        this.router.navigateByUrl('/admin')
      } else if (response.user[0].admin == 0) {
        this.router.navigateByUrl('/home')
      } else {
        this.router.navigateByUrl('/home')
      }
    });
    return true;
  }

  public login(token: string) {
    localStorage.setItem('token', token);

    this.userService.getUserByToken().subscribe(response => {
      if (response.user[0].admin == 1) {
        this.router.navigateByUrl('/admin')
      } else {
        this.router.navigateByUrl('/home')
      }
    })

  }
}
