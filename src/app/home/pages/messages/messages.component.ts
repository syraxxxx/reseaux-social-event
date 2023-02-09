import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MessengerService} from "../../../@core/services/messenger.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: any;
  messageByUser: any;
  user_connected: any;
  today = new Date();
  destinataire: any;

  constructor(
    private serviceUser: UtilisateurService,
    private spinner: NgxSpinnerService,
    private userService: UtilisateurService,
    private messengerService: MessengerService,
  ) {
  }

  ngOnInit(): void {
    // this.spinner.show();
    this.getData();
  }

  getData() {
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
      this.loadAllMessages();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  loadAllMessages() {
    console.log(this.user_connected);
    this.messengerService.getListePersonMessages(this.user_connected.id).subscribe(response => {
      this.messages = response.publication;
    });
  }

  loadMessagebyUser(idDestinataire: any) {
    console.log(this.messages);
    console.log('connnected : ' + this.user_connected.id);
    console.log('destinataire : ' + idDestinataire);
    this.messengerService.getMessageUser(this.user_connected.id, idDestinataire).subscribe(response => {
      this.messageByUser = response.publication.sort().reverse();
      this.destinataire = idDestinataire;
    });

  }
}
