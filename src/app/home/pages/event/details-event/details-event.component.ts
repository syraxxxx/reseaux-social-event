import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PublicationService} from "../../../../@core/services/publication.service";
import {NgxSpinnerService} from "ngx-spinner";
import {UtilisateurService} from "../../../../@core/services/utilisateur.service";
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from "../../../../@core/services/comment.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss']
})
export class DetailsEventComponent implements OnInit {
  eventID: any;
  event: any;
  month: any;
  user_connected: any;
  person_liked: any;
  liked_active: boolean = false;
  nombre_like: any;
  nombre_comments: any;
  commentaires: any;
  displayStyle = 'none';
  event_updated: any;
  errorMessage: any;
  env = `${environment.BASE}`;

  formComment = new FormGroup({
    utilisateur_id: new FormControl(''),
    publication_id: new FormControl(''),
    corps: new FormControl(''),
  });

  formEventUpdate = new FormGroup({
    utilisateur_id: new FormControl(''),
    categories_id: new FormControl(''),
    description: new FormControl(''),
    payement_link: new FormControl(''),
    event_name: new FormControl(''),
    date_realisation: new FormControl(''),
    lieu: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicationService: PublicationService,
    private spinner: NgxSpinnerService,
    private userService: UtilisateurService,
    private postService: PublicationService,
    private commentService: CommentService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();

  }

  getData() {

    // console.log('valeur de like : ' + this.liked_active)
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    this.eventID = this.route.snapshot.paramMap.get('publication_id');
    this.publicationService.getPublication(this.eventID).subscribe(response => {
      this.event = response.publication[0];
      console.log(this.event);
      this.month = months[new Date(this.event.date_realisation).getMonth()].toUpperCase();
    });
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
      this.likeVerification();
    });
    this.publicationService.getLikesByPublication(this.eventID).subscribe(response => {
      this.person_liked = response.likes;
    });
    this.getNombreLike();
    this.getAllCommentaireByEvent();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);

  }

  getNombreLike() {
    this.postService.getLikesByPublication(this.eventID).subscribe(response => {
      this.nombre_like = response.likes.length;
    });
  }

  likeVerification() {
    this.postService.isLiked(this.eventID, this.user_connected.id).subscribe(response => {
      // console.log("valeur de sideja : " + response.sideja)
      if (response.sideja == 1) {
        this.liked_active = true;
      }
      ;
    });
  }

  likePublication(idPub: any) {
    const data = {
      utilisateur_id: this.user_connected.id,
      publication_id: idPub,
      valeur: 1
    };
    this.postService.likePublication(data).subscribe(response => {
      // console.log(response);
      this.getNombreLike();
    });
    this.postService.isLiked(idPub, this.user_connected.id).subscribe(response => {
      if (response.sideja == 1) {
        this.liked_active = true
      }
      ;
    });
  }

  disLikePublication(idPub: any) {
    let data = {
      utilisateur_id: this.user_connected.id,
      publication_id: idPub,
      valeur: -1
    };
    this.postService.likePublication(data).subscribe(response => {
      // console.log(response);
      this.getNombreLike();
    });
    this.postService.isLiked(idPub, this.user_connected.id).subscribe(response => {
      if (response.sideja == 1) {
        this.liked_active = false
      }
      ;
    });
  }

  commentEvent() {
    this.spinner.show();
    this.formComment.get('utilisateur_id')?.setValue(this.user_connected.id);
    this.formComment.get('publication_id')?.setValue(this.eventID);
    this.commentService.create(this.formComment.value).subscribe(response => {
      this.formComment.reset();
      this.getAllCommentaireByEvent();
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    })
  }

  getAllCommentaireByEvent() {
    this.commentService.getCommentairesByIdEvent(this.eventID).subscribe(res => {
      this.commentaires = res.publication;
      this.nombre_comments = res.publication.length;
    });
  }

  goToUser(idUser: any) {
    this.router.navigate(['/home/profile', idUser]);
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  updateButton(event: any) {
    this.event_updated = event;
    this.openPopup();
  }

  updatePublication() {
    console.log(this.formEventUpdate.value);
    this.postService.update(this.formEventUpdate.value).subscribe(response => {
      console.log(response);
    })
  }
}
