import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PublicationService} from "../../../../@core/services/publication.service";
import {NgxSpinnerService} from "ngx-spinner";
import {UtilisateurService} from "../../../../@core/services/utilisateur.service";

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

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    private spinner: NgxSpinnerService,
    private userService: UtilisateurService,
    private postService: PublicationService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    console.log('valeur de like : ' + this.liked_active)
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    this.eventID = this.route.snapshot.paramMap.get('publication_id');
    this.publicationService.getPublication(this.eventID).subscribe(response => {
      this.event = response.publication[0];
      this.month = months[new Date(this.event.date_realisation).getMonth()].toUpperCase();
    });
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
      this.likeVerification();
    });
    this.publicationService.getLikesByPublication(this.eventID).subscribe(response => {
      this.person_liked = response.likes;
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  likeVerification() {
    this.postService.isLiked(this.eventID, this.user_connected.id).subscribe(response => {
      console.log("valeur de sideja : " + response.sideja)
      if (response.sideja == 1) {
        this.liked_active = true;
      }
      ;
    });
  }

  likePublication(idPub: any) {
    const data = {
      utilisateur_id: this.user_connected.id,
      publication_id: idPub
    };
    this.postService.likePublication(data).subscribe(response=>{
      console.log(response);
    });
    this.postService.isLiked(idPub, this.user_connected.id).subscribe(response => {
      if (response.sideja == 1) {
        this.liked_active = true
      };
    });
  }

}
