import {Component, OnInit} from '@angular/core';
import {PublicationService} from "../../../@core/services/publication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  publications: any;

  constructor(
    private router :Router,
    private postService: PublicationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.postService.getListePublication().subscribe(response => {
      this.publications = response.publication;
      console.log(response.publication);
    })
  }
  getDetails(pub :any){
    this.router.navigate(['/home/event', pub]);
  }
}
