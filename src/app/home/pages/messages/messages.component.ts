import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MessengerService} from "../../../@core/services/messenger.service";
import {environment} from "../../../../environments/environment";

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
  personMessageFilter!: string;
  personnes: any;
  showSearchPerson = false;
  page = 1; // page courante
  pageSize = 5; // nombre de données par page
  env = `${environment.BASE}`;
  constructor(
    private serviceUser: UtilisateurService,
    private spinner: NgxSpinnerService,
    private userService: UtilisateurService,
    private messengerService: MessengerService,
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
    // console.log('this destinataire : ' + this.destinataire);

    // setInterval(() => {
    //   if (this.destinataire) {
    //     setInterval(() => {
    //       this.loadMessagebyUser(this.destinataire);
    //     }, 500);
    //   }
    // }, 500);

  }

  getData() {
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
      this.loadAllMessages();
    });
    this.userService.getAllUser().subscribe(response => {
      this.personnes = response.utilisateurs;
      console.log(this.personnes)
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  loadAllMessages() {
    this.messengerService.getListePersonMessages(this.user_connected.id).subscribe(response => {
      this.messages = response.publication;
      console.log(this.messages);
    });
  }

  loadMessagebyUser(idDestinataire: any) {
    this.spinner.show();
    this.showSearchPerson = false;
    this.destinataire = idDestinataire;
    this.messengerService.getMessageUser(this.user_connected.id, idDestinataire).subscribe(response => {
      this.messageByUser = response.publication.sort().reverse();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  };

  onPersonMessageFilterChange() {
    this.showSearchPerson = !(!this.personMessageFilter);
    // console.log("value of show person : " + this.showSearchPerson)
  }

  clearFilter() {
    this.showSearchPerson = false;
    this.personMessageFilter = '';
  }
}
