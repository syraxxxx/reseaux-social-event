import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../@core/services/token.service";
import {LogoutService} from "../security/logout/logout.service";
import {UtilisateurService} from "../@core/services/utilisateur.service";
import {MessengerService} from "../@core/services/messenger.service";
import {SearchService} from "../@core/services/search.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menuItems !: any[];
  profilMenuItems !: any[]

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private logoutService: LogoutService,
    private userService: UtilisateurService,
    private messengerService: MessengerService,
    private searchService: SearchService
  ) {
  }

  ngOnInit(): void {
    this.setMenuItems();
  }

  setMenuItems() {
    this.menuItems = [
      {path: '/admin/categorie', title: 'Categories', icon: 'fas fa-car'},
      {path: '/admin/users', title: 'Utilisateurs', icon: 'fas fa-hourglass-half'},
      {path: '/admin/events', title: 'Evenements', icon: 'fas fa-hourglass-half'}
    ];
    this.profilMenuItems = [
      // {path: '/home/profile', title: 'Profile', icon: 'feather-user me-3'},
      // {path: '/home/messages', title: 'Messages', icon: 'feather-message-square me-3'},
      // {path: '/home/settings', title: 'Paramètres', icon: 'feather-settings me-3'},
    ];
  }

  logout() {
    this.logoutService.logout();
  }
}
