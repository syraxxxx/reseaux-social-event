import {Component, OnInit} from '@angular/core';
import {TokenService} from "../@core/services/token.service";
import {LogoutService} from "../security/logout/logout.service";
import {UtilisateurService} from "../@core/services/utilisateur.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuItems !: any[];
  profilMenuItems !: any[]
  user_connected: any;

  constructor(
    private tokenService: TokenService,
    private logoutService: LogoutService,
    private userService: UtilisateurService
  ) {
  }

  ngOnInit(): void {
    this.setMenuItems();
    this.getData();
  }

  getData() {
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
    })
  }

  setMenuItems() {
    this.menuItems = [
      {path: '/home', title: 'Accueil', icon: 'fas fa-car'},
      {path: '/home/explore', title: 'Explorer', icon: 'fas fa-hourglass-half'},
      {path: '/home/discussion', title: 'Discussion', icon: 'fas fa-hourglass-half'}
    ];
    this.profilMenuItems = [
      {path: '/home/profile', title: 'Profile', icon: 'feather-user me-3'},
      {path: '/home/messages', title: 'Messages', icon: 'feather-message-square me-3'},
      {path: '/home/settings', title: 'Paramètres', icon: 'feather-settings me-3'},
    ];
  }

  logout() {
    this.logoutService.logout();
  }
}
