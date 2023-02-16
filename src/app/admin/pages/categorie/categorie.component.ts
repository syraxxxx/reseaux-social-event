import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../../@core/services/token.service";
import {LogoutService} from "../../../security/logout/logout.service";
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {MessengerService} from "../../../@core/services/messenger.service";
import {SearchService} from "../../../@core/services/search.service";
import {PublicationService} from "../../../@core/services/publication.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CommentService} from "../../../@core/services/comment.service";
import {CategorieService} from "../../../@core/services/categorie.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  categories: any;

  formCategorie = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private postService: PublicationService,
    private userServive: UtilisateurService,
    private spinner: NgxSpinnerService,
    private categorieService : CategorieService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData(){
    this.postService.getCategories().subscribe(response => {
      this.categories = response.likes;
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  delete(id:any){

  }
  addCategorie(){
    this.categorieService;
  }
}
