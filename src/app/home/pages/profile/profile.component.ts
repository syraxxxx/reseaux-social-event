import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {DomSanitizer} from "@angular/platform-browser";
import {PhotoService} from "../../../@core/services/photo.service";

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
  couverture_update!: any;
  displayStyle = 'none';
  previewImageProfil: any;
  previewImageCover: any;
  formPicProfil = new FormGroup({
    utilisateur_id: new FormControl('', [Validators.required]),
    token_id: new FormControl('', [Validators.required]),
    profil_photo: new FormControl('', [Validators.required]),
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
    private photoService: PhotoService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
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
      // console.log("token : " + this.token);
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
        this.closePopup();
        this.getData();
        Swal.fire({
          text: `Votre photo de profil a été modifié`, icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  updatePictureCouverture() {
    this.formPicCover.get('utilisateur_id')?.setValue(this.user_connected.id);
    this.formPicCover.get('token_id')?.setValue(this.token);
    this.userService.updateCouverturePicture(this.formPicCover.value).subscribe({
      next: (res: any) => {
        this.closePopup();
        this.getData();
        Swal.fire({
          text: `Votre photo de couverture a été modifié`, icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  updateProfilButton() {
    this.openPopup();
    this.profil_update = 'profil';
  }

  updateCoverButton() {
    this.openPopup();
    this.couverture_update = 'couverture';
  }

  onFileSelected(event: any) {
    // Récupérer le fichier sélectionné
    const file = event.target.files[0];
    // Vérifier si le fichier est une image
    if (file.type.match('image.*')) {
      // Lire le fichier avec FileReader
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Convertir l'URL en objet sécurisé pour l'afficher
        this.previewImageProfil = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      this.formPicProfil.get('profil_photo')?.setValue(file);
    } else {
      console.log('Le fichier sélectionné n\'est pas une image.');
    }
  }

  onFileSelectedCover(event: any) {
    const file = event.target.files[0];
    if (file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageCover = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      this.formPicCover.get('couverture_photo')?.setValue(file);
    } else {
      console.log('Le fichier sélectionné n\'est pas une image.');
    }
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
    this.couverture_update = null;
    this.profil_update = null;
  }

}
