import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  formMail = new FormGroup({
    user_id: new FormControl('', [Validators.required]),
    old_mail: new FormControl('', [Validators.required]),
    new_mail: new FormControl('', [Validators.required]),
  });
  formMdp = new FormGroup({
    user_id: new FormControl('', [Validators.required]),
    old_mdp: new FormControl('', [Validators.required]),
    new_mdp: new FormControl('', [Validators.required]),
  });
  formDesactivate = new FormGroup({
    user_id: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mdp: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  changeMail() {
    console.log('change mail');
  }

  changeMdp() {
    console.log('change mdp');
  }

  desactivateAccount() {
    console.log('desactivate account');
  }

}
