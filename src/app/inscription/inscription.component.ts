import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilisateurService} from "../@core/services/utilisateur.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  errorMessage !: string;
  formInscription = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    mdp: new FormControl('', [Validators.required]),
    pays: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required]),
    profil_photo: new FormControl('')
  });

  constructor(
    private serviceUser: UtilisateurService
  ) {
  }

  ngOnInit(): void {
  }

  signIn() {
    this.serviceUser.create(this.formInscription.value).subscribe({
      next: (response) => {
        Swal.fire({
          text: `${this.formInscription.value.nom}, votre inscription a été effectuée avec succès`, icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (erreur) => this.errorMessage = erreur.error.message
    });
  }

}