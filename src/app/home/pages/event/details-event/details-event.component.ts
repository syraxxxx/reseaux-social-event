import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PublicationService} from "../../../../@core/services/publication.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss']
})
export class DetailsEventComponent implements OnInit {
  eventID: any;
  event: any;

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    private spinner : NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    this.eventID = this.route.snapshot.paramMap.get('publication_id');
    this.publicationService.getPublication(this.eventID).subscribe(response => {
      this.event = response.publication[0];
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}
