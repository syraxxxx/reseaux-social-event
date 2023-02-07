import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: any;
  messageByUser: any;
  user_connected: any;

  constructor(
    private serviceUser: UtilisateurService,
    private spinner : NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    // this.spinner.show();
  }

  getData() {
    this.serviceUser.getListePersonMessages().subscribe(response => {
      this.messages = response;
    });
    this.serviceUser.getMessage(1).subscribe(response => {
      this.messageByUser = response;
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  loadMessagebyUser(idDestinataire : any){
    this.serviceUser.getMessage(2).subscribe(response=>{
      this.messageByUser = response;
    })
  }
}
