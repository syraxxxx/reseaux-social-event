import {Component, OnInit} from '@angular/core';
import {PublicationService} from "../../../@core/services/publication.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events !: any;

  constructor(
    private postService: PublicationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.postService.getListePublication().subscribe(response => [
      this.events = response.publication
    ])
  };

  delete() {
  }

}
