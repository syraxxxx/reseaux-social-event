import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuItems !:  any[];
  profilMenuItems !:  any[]
  constructor() { }

  ngOnInit(): void {
    this.setMenuItems();
  }
  setMenuItems(){
    this.menuItems = [
      {path: '/home', title: 'Accueil', icon: 'fas fa-car'},
      {path: '/home/explore', title: 'Explorer', icon: 'fas fa-hourglass-half'},
      {path: '/home/discussion', title: 'Discussion', icon: 'fas fa-hourglass-half'}
    ];
    this.profilMenuItems = [
      {path: '/home/profile', title: 'Profile', icon: 'feather-user me-3'},
      {path: '/home/messages', title: 'Messages', icon: 'feather-message-square me-3'},
      {path: '/home/settings', title: 'Paramètres', icon: 'feather-settings me-3'},
      {path: '/home', title: 'Déconnexion', icon: 'feather-log-out me-3'},
    ];
  }
}
