import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor() {
  }

  ngOnInit(): void {
  }

  create_event() {
    console.log(this.formNewEvent.value);
    console.log('click');

    //service to create publication
    //service to insert image in db
  }
}
