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

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  categories: any;
  constructor(
    private router: Router,
    private postService: PublicationService,
    private userServive: UtilisateurService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.postService.getCategories().subscribe(response => {
      this.categories = response.likes;
    });
  }
}
