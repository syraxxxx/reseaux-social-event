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
  user_connected :any;

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    private spinner: NgxSpinnerService,
    private userService : UtilisateurService,
    private postService : PublicationService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    this.eventID = this.route.snapshot.paramMap.get('publication_id');
    this.publicationService.getPublication(this.eventID).subscribe(response => {
      this.event = response.publication[0];
      this.month = months[new Date(this.event.date_realisation).getMonth()].toUpperCase();
    });
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  likePublication(idPub: any) {
    const data = {
      utilisateur_id: this.user_connected.id,
      publication_id: idPub
    };
    this.postService.likePublication(data).subscribe(response => {
      console.log(response);
    });
  }
}
