import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PublicationService} from "../../../@core/services/publication.service";
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CommentService} from "../../../@core/services/comment.service";

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.scss']
})
export class AccueilAdminComponent implements OnInit {

  publications: any;
  user_connected: any;
  categories: any;
  searchFilter : any;
  utilisateurs : any;
  page = 1; // page courante
  pageSize = 3; // nombre de données par page
  constructor(
    private router: Router,
    private postService: PublicationService,
    private userService: UtilisateurService,
    private spinner: NgxSpinnerService,
    private commentService : CommentService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
      this.postService.getListePublication().subscribe(response => {
        this.publications = response.publication;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      });
    });
    this.postService.getCategories().subscribe(response => {
      this.categories = response.likes;
    });
    this.userService.getAllUser().subscribe(response=>{
      this.utilisateurs = response.utilisateurs;
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    });

  }

  getDetails(pub: any) {
    this.router.navigate(['/home/event', pub]);
  }

  likePublication(idPub: any) {
    const data = {
      utilisateur_id: this.user_connected.id,
      publication_id: idPub,
      valeur: 1
    };
    this.postService.likePublication(data).subscribe(response => {
      this.getData();
    });
  }

  dislikePublication(idPub: any) {
    const data = {
      utilisateur_id: this.user_connected.id,
      publication_id: idPub,
      valeur: -1
    };
    this.postService.likePublication(data).subscribe(response => {
      this.getData();
    });
  }

  getEventByCategorie(idCat: any) {
    this.postService.getPublicationByCategorie(idCat).subscribe(response => {
      this.publications = response.publications;
    });
  }

}
