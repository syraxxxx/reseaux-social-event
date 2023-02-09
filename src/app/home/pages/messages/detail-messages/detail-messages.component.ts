import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilisateurService} from "../../../../@core/services/utilisateur.service";
import {MessengerService} from "../../../../@core/services/messenger.service";

@Component({
  selector: 'app-detail-messages',
  templateUrl: './detail-messages.component.html',
  styleUrls: ['./detail-messages.component.scss']
})
export class DetailMessagesComponent implements OnChanges {
  @Input() USER_MESSAGE_SELECTED: any;
  @Input() ID_DESTINATAIRE: any;
  @ViewChild('messageList') messageList: ElementRef;
  @Output() scrollEvent = new EventEmitter<any>();

  messages: any;
  user_connected: any;
  formMessage = new FormGroup({
    user_id: new FormControl('', [Validators.required]),
    destinataire_id: new FormControl('', [Validators.required]),
    corps: new FormControl('', [Validators.required]),
  });

  constructor(
    private serviceUser: UtilisateurService,
    private messengerService: MessengerService,
    private elementRef : ElementRef
  ) {
    this.messageList = this.elementRef.nativeElement.querySelector('.messageList');
  }

  ngOnChanges() {
    this.getData();
  }

  getData() {
    this.serviceUser.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
    });
    this.messages = this.USER_MESSAGE_SELECTED;
  }

  sendMessage() {
    if (this.formMessage.get('corps') && this.formMessage.get('corps')?.value) {
      this.formMessage.get('user_id')?.setValue(this.user_connected.id);
      this.formMessage.get('destinataire_id')?.setValue(this.ID_DESTINATAIRE);
      this.serviceUser.sendMessage(this.formMessage.value).subscribe(response => {
        this.formMessage.reset();
        this.reloadMessage(this.user_connected.id, this.ID_DESTINATAIRE);
      });
    }
  }

  reloadMessage(idUser: any, idDestinataire: any) {
    this.messengerService.getMessageUser(idUser, idDestinataire).subscribe(response => {
      this.messages = response.publication.sort().reverse();
      this.messageList.nativeElement.lastElementChild.scrollIntoView({ behavior: 'smooth' });
      // this.scrollToBottom();
    });
  }
  public scrollToBottom() {
    this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
    this.scrollEvent.emit();
  }

  messageByme(idUser: any) {
    if (idUser == this.user_connected.id) {
      return true;
    }
    return false;
  }
}
