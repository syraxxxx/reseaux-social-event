import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {PublicationService} from "../../../@core/services/publication.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CategorieService} from "../../../@core/services/categorie.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  categories: any;
  update = false;
  categorie_updated!: any;
  displayStyle = 'none';
  page = 1; // page courante
  pageSize = 10; // nombre de données par page

  formCategorie = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  formCategorieUpdated = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private postService: PublicationService,
    private userServive: UtilisateurService,
    private spinner: NgxSpinnerService,
    private categorieService: CategorieService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    this.postService.getCategories().subscribe(response => {
      this.categories = response.likes;
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  delete(id: any) {

  }

  addCategorie() {
    this.categorieService.create(this.formCategorie.value).subscribe(response => {
      Swal.fire({
        text: `La catégorie '${this.formCategorie.value.nom}' a été ajouté à votre liste de catégorie`, icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      this.getData();
    });
  }

  updateCategorie(categorie: any) {
    this.formCategorieUpdated.get('id')?.setValue(categorie.id);
    this.categorieService.update(this.formCategorieUpdated.value).subscribe(response => {
      this.getData();
      this.closePopup();
      Swal.fire({
        text: `La catégorie a été mis à jour avec succès `, icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  updateButton(categorie: any) {
    this.openPopup();
    this.categorie_updated = categorie
  }

}
