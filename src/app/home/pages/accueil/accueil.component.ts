import {Component, OnInit} from '@angular/core';
import {PublicationService} from "../../../@core/services/publication.service";
import {Router} from "@angular/router";
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  publications: any;
  user_connected: any;
  categories : any;
  constructor(
    private router: Router,
    private postService: PublicationService,
    private userServive: UtilisateurService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    this.postService.getListePublication().subscribe(response => {
      this.publications = response.publication;
    });
    this.userServive.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
    });
    this.postService.getCategories().subscribe(response => {
      this.categories = response.likes;
      console.log(response.likes);
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  getDetails(pub: any) {
    this.router.navigate(['/home/event', pub]);
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

  openNewEventDialog() {

  }
}
