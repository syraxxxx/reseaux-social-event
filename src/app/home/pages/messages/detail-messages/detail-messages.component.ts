import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilisateurService} from "../../../../@core/services/utilisateur.service";

@Component({
  selector: 'app-detail-messages',
  templateUrl: './detail-messages.component.html',
  styleUrls: ['./detail-messages.component.scss']
})
export class DetailMessagesComponent implements OnInit {
  @Input() USER_CONNECTED :any;

  formMessage = new FormGroup({
    user_id: new FormControl('', [Validators.required]),
    destinataire_id: new FormControl('', [Validators.required]),
    corps: new FormControl('', [Validators.required]),
  });
  constructor(
    private serviceUser : UtilisateurService
  ) { }

  ngOnInit(): void {
  }
  getData(){
    //load all message here
  }
  sendMessage(){
    console.log('message')
    this.serviceUser.sendMessage(this.formMessage).subscribe();
    this.getData();
  }
}
