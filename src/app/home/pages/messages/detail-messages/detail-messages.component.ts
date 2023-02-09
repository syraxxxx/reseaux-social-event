import {Component, Input, OnChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilisateurService} from "../../../../@core/services/utilisateur.service";

@Component({
  selector: 'app-detail-messages',
  templateUrl: './detail-messages.component.html',
  styleUrls: ['./detail-messages.component.scss']
})
export class DetailMessagesComponent implements OnChanges {
  @Input() USER_MESSAGE_SELECTED: any;
  @Input() ID_DESTINATAIRE: any;
  messages: any;
  user_connected: any;
  formMessage = new FormGroup({
    user_id: new FormControl('', [Validators.required]),
    destinataire_id: new FormControl('', [Validators.required]),
    corps: new FormControl('', [Validators.required]),
  });

  constructor(
    private serviceUser: UtilisateurService
  ) {
  }

  ngOnChanges() {
    this.getData();
  }

  getData() {
    this.serviceUser.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
    });
    this.messages=this.USER_MESSAGE_SELECTED;
  }

  sendMessage() {
    console.log('message');
    if (this.formMessage.get('corps') && this.formMessage.get('corps')?.value) {
      this.formMessage.get('user_id')?.setValue(this.user_connected.id);
      this.formMessage.get('destinataire_id')?.setValue(this.ID_DESTINATAIRE);
      this.serviceUser.sendMessage(this.formMessage.value).subscribe(response => {
        this.formMessage.reset();
        this.ngOnChanges();
      });
    }
  }

  messageByme(idUser: any) {
    if (idUser == this.user_connected.id) {
      return true;
    }
    return false;
  }
}
