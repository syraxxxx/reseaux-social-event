import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilisateurService} from "../../../../@core/services/utilisateur.service";

@Component({
  selector: 'app-detail-messages',
  templateUrl: './detail-messages.component.html',
  styleUrls: ['./detail-messages.component.scss']
})
export class DetailMessagesComponent implements OnInit {
  @Input() USER_MESSAGE_SELECTED: any;
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

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.serviceUser.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
    })
    //load all message here
  }

  sendMessage() {
    console.log('message');
    if (this.formMessage.get('corps') && this.formMessage.get('corps')?.value){
      this.formMessage.get('user_id')?.setValue(this.user_connected.id);
      this.formMessage.get('destinataire_id')?.setValue(5);
      this.serviceUser.sendMessage(this.formMessage.value).subscribe();
      this.formMessage.reset();
      this.getData();
    }
  }
}
