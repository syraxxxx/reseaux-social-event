import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from "../../../@core/services/utilisateur.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user_connected :any;
  constructor(
    private userService : UtilisateurService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
    })
  }
}
