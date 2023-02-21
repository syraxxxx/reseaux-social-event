import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PublicationService} from "../../../@core/services/publication.service";
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CommentService} from "../../../@core/services/comment.service";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  publications: any;
  user_connected: any;
  categories: any;
  searchEvent : any;
  constructor(
    private router: Router,
    private postService: PublicationService,
    private userServive: UtilisateurService,
    private spinner: NgxSpinnerService,
    private commentService : CommentService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    this.userServive.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
      this.postService.getListePublication().subscribe(response => {
        this.publications = response.publication;
        for (let pub of this.publications) {
          // avoir nombre de like par post
          this.postService.getLikesByPublication(pub.id).subscribe(response => {
            pub.nombrelike = response.likes.length;
          });
          //avoir nombre de commentaire par post
          this.commentService.getCommentairesByIdEvent(pub.id).subscribe(response=>{
            pub.nombreComments = response.publication.length;
          })
          this.postService.isLiked(pub.id, this.user_connected.id).subscribe(response => {
            pub.like_actived = false
            if (response.sideja == 1) {
              pub.like_actived = true
            }
          })
        }
      });
    });
    this.postService.getCategories().subscribe(response => {
      this.categories = response.likes;
    });
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 500);
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
      console.log(response);
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
      console.log(response);
      this.getData();
    });
  }

  getEventByCategorie(idCat: any) {
    this.spinner.show();
    this.postService.getPublicationByCategorie(idCat).subscribe(response => {
      this.publications = response.publications;
    });
  }
  goToUser(idUser: any) {
    this.router.navigate(['/home/profile', idUser]);
  }

}
