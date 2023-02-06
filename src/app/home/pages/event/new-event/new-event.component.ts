import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PublicationService} from "../../../../@core/services/publication.service";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  formNewEvent = new FormGroup({
    utilisateur_id: new FormControl('', [Validators.required]),
    categories_id: new FormControl('', [Validators.required]),
    date_realisation: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    publication_id: new FormControl('', [Validators.required]),
  });

  categories = [];

  constructor(
    private postService: PublicationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.postService.getCategories().subscribe(response=>{
      this.categories=response.likes[0];
      console.log(response.likes)
    })
  }

  create_event() {
    console.log(this.formNewEvent.value);
    console.log('click');

    //service to create publication
    //service to insert image in db
  }
}
