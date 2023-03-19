import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilisateurService} from "../@core/services/utilisateur.service";
import Swal from 'sweetalert2';
import {CountryService} from "../@core/services/country.service";
import {Router} from "@angular/router";


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
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    mdp: new FormControl('', [Validators.required]),
    pays: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required]),
    profil_photo: new FormControl('')
  });
  passwordType = 'password';

  constructor(
    private serviceUser: UtilisateurService,
    private serviceCountry: CountryService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // this.getListCountry();
  }

  signIn() {
    this.serviceUser.create(this.formInscription.value).subscribe({
      next: (response) => {
        console.log(response);
        if (!response.success) {
          this.errorMessage = response.message
        } else {
          Swal.fire({
            text: `${this.formInscription.value.nom}, votre inscription a été effectuée avec succès`, icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/login']);
        }
      },
      error: (erreur) => {
        this.errorMessage = erreur.error.message
      }

    });
  }

  getListCountry() {
    this.serviceCountry.getCountries().subscribe(res => {
      // console.log(res)
    })
  }

  showPassword() {
    this.passwordType = 'text';
  }

  hidePassword() {
    this.passwordType = 'password';
  }
}
