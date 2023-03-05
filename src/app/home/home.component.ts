import {Component, OnInit} from '@angular/core';
import {TokenService} from "../@core/services/token.service";
import {LogoutService} from "../security/logout/logout.service";
import {UtilisateurService} from "../@core/services/utilisateur.service";
import {MessengerService} from "../@core/services/messenger.service";
import {Router} from "@angular/router";
import {Message} from "../@core/models/message.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuItems !: any[];
  profilMenuItems !: any[]
  user_connected: any;
  messages!: Message[];
  messageByUser: any;
  searchTerm!: string;
  page = 1;
  pageSize = 4;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private logoutService: LogoutService,
    private userService: UtilisateurService,
    private messengerService: MessengerService,
  ) {
  }

  ngOnInit(): void {
    this.setMenuItems();
    this.getData();
  }

  getData() {
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
      this.loadAllMessages();
    })
  }

  setMenuItems() {
    this.menuItems = [
      {path: '/home', title: 'Accueil', icon: 'fas fa-car'},
      {path: '/home/explore', title: 'Explorer', icon: 'fas fa-hourglass-half'},
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

  loadAllMessages() {
    this.messengerService.getListePersonMessages(this.user_connected.id).subscribe(response => {
      this.messages = response.publication;
      console.log(this.messages)
    });
  };

  loadMessagebyUser(idDestinataire: any) {
    this.router.navigateByUrl('/home/messages');
    this.messengerService.getMessageUser(this.user_connected.id, idDestinataire).subscribe(response => {
      this.messageByUser = response.publication.sort().reverse();
    });
  };

  onSearch() {
    this.router.navigateByUrl('/home/res/' + this.searchTerm);
  }

  clearFilter() {
    this.searchTerm = '';
  }
}
