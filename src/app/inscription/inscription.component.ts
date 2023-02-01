import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  public formInscription = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    mot_de_passe: new FormControl('', [Validators.required]),
    pays: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required]),
    profil_photo: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  signIn(){

  }

}
