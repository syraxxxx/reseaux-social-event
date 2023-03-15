import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoService} from "../../../@core/services/photo.service";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user_connected: any;
  idPerson: any;
  personne_profil: any;
  personne_publications: any;
  searchEvent: any;
  page = 1; // page courante
  pageSize = 6; // nombre de données par page
  photo: any;
  env = `${environment.BASE}`;
  token = localStorage.getItem('token');
  profil_update!: any;
  displayStyle = 'none';

  formPicProfil = new FormGroup({
    utilisateur_id: new FormControl('', [Validators.required]),
    token_id: new FormControl('', [Validators.required]),
    photo_profil: new FormControl('', [Validators.required]),
  });
  formPicCover = new FormGroup({
    utilisateur_id: new FormControl('', [Validators.required]),
    token_id: new FormControl('', [Validators.required]),
    couverture_photo: new FormControl('', [Validators.required]),
  })

  constructor(
    private userService: UtilisateurService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    this.photoService.getPhoto('photo.png').subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
    this.idPerson = this.route.snapshot.paramMap.get('user_id');
    if (this.idPerson) {
      this.userService.getUserbyId(this.idPerson).subscribe(response => {
        this.personne_profil = response.utilisateur[0];
        this.userService.getPublicationByUser(this.personne_profil.id).subscribe(res => {
          this.personne_publications = res.publication;
          // console.log(this.personne_publications);
        })
      });
    } else {

      this.userService.getUserByToken().subscribe(response => {
        this.personne_profil = response.user[0];
        this.userService.getPublicationByUser(this.personne_profil.id).subscribe(res => {
          this.personne_publications = res.publication;
        })
      });
    }

    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
      console.log("token : " + this.token);
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  getDetails(pub: any) {
    this.router.navigate(['/home/event', pub]);
  }

  updatePictureProfil() {
    this.formPicProfil.get('utilisateur_id')?.setValue(this.user_connected.id);
    this.formPicProfil.get('token_id')?.setValue(this.token);
    this.userService.updateProfilPicture(this.formPicProfil.value).subscribe({
      next: (res: any) => {
        Swal.fire({
          text: `Votre Photo de Profil a été modifié`, icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (err: any) => {

      }
    })
  }

  updateProfilButton() {
    this.openPopup();
    this.profil_update = 'test';
  }

  updatePictureCover() {
    this.userService.updateCouverturePicture(this.formPicProfil.value).subscribe({
      next: (res: any) => {

      },
      error: (err: any) => {

      }
    })
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

}
