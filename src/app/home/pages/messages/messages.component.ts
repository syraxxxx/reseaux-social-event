import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../@core/services/utilisateur.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  personMessages: any;
  messages: any;
  user_connected: any;

  constructor(
    private serviceUser: UtilisateurService
  ) {
  }

  ngOnInit(): void {
  }

  getData() {
    this.serviceUser.getListePersonMessages().subscribe(response => {
      this.personMessages = response;
    });
    this.serviceUser.getMessage(1).subscribe(response => {
      this.messages = response;
    })
  }
}
